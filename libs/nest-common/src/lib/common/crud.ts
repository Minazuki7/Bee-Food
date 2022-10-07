import { Query, Resolver, Args, ID, Mutation, Info } from "@nestjs/graphql";
import { isEmpty, isArray } from "lodash";
import { Model } from "mongoose";
import { Type } from "@nestjs/common";
import { Document, Query as MongooseQuery } from "mongoose";
import {
  FragmentDefinitionNode,
  GraphQLError,
  GraphQLResolveInfo,
  SelectionSetNode,
} from "graphql";
import { IPaginatedListType, PaginationArgs } from "./List";
import { ObjMap } from "graphql/jsutils/ObjMap";
import autoPopulate from "./autoPopulate";

export function CrudResolver<T extends Type<unknown>, M, N>(
  classRef: T,
  paginatedReturn: M
): any {
  @Resolver({ isAbstract: true })
  abstract class CrudResolverHost {
    model: Model<N>;
    constructor(model: Model<N>) {
      this.model = model;
    }

    async matchResult<T extends Record<string, any>>(
      result: T,
      info?: SelectionSetNode,
      fragments?: ObjMap<FragmentDefinitionNode>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      populateCondition?: Record<string, any>
    ): Promise<T> {
      if (typeof result !== "object" || !info || isArray(result)) return result;

      if (result instanceof Document) {
        return await result["populate"](
          autoPopulate(result["schema"], info, fragments, populateCondition)
        );
      }

      if (result instanceof MongooseQuery) {
        return await result["populate"](
          autoPopulate(result["schema"], info, fragments, populateCondition)
        );
      }

      const newResult = {} as T;
      const keys: (keyof T)[] = Object.keys(result);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const nextSelection = info.selections.find(
          (selection) =>
            selection.kind === "Field" && selection.name.value === key
        );

        newResult[key] =
          nextSelection && nextSelection.kind === "Field"
            ? await this.matchResult(
                result[key],
                nextSelection.selectionSet,
                fragments,
                populateCondition
              )
            : result[key];
      }
      return newResult;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Query((type) => paginatedReturn as any, {
      name: `findAll${classRef.name}s`,
    })
    async findAll(
      @Args("pagination", { type: () => PaginationArgs, nullable: true })
      args: PaginationArgs,
      @Info() info: GraphQLResolveInfo
    ): Promise<IPaginatedListType<T>> {
      const {
        perPage = -1,
        page = 1,
        sort: sortArgs,
        order,
        ...rest
      } = args || { perPage: -1, page: 1 };

      let count = 0;
      if (isEmpty(rest)) {
        count = await this.model.estimatedDocumentCount(rest);
      } else {
        count = await this.model.find(rest).countDocuments();
      }
      const sort = sortArgs ? { [sortArgs]: order || -1 } : { updatedAt: -1 };
      const preResult =
        perPage > 0
          ? this.model
              .find(rest)
              .sort(sort)
              .skip(perPage * (page - 1))
              .limit(perPage)
          : this.model.find(rest).sort(sort);
      return await this.matchResult(
        {
          count,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: preResult as any,
          perPage: perPage === -1 ? count : perPage,
          page,
          totalPages: Math.ceil(count / perPage),
        },
        info.fieldNodes[0].selectionSet,
        info.fragments
      );
    }

    @Query(() => classRef, { name: `find${classRef.name}` })
    async findOne(
      @Args("id", { type: () => ID }) id: string,
      @Info() info: GraphQLResolveInfo
    ) {
      const doc = await this.model.findOne({ _id: id });
      if (!doc) throw new GraphQLError("This dodcument doesn't exsit");
      return await this.matchResult(
        doc,
        info.fieldNodes[0].selectionSet,
        info.fragments
      );
    }
    @Mutation(() => String, { name: `remove${classRef.name}` })
    async removeOneById(@Args("id", { type: () => ID }) id: string) {
      if (id) {
        const doc = await this.model.findOne({ _id: id });
        if (!doc) {
          throw new GraphQLError("This dodcument doesn't exsit");
        }
        await this.model.deleteOne({ _id: doc._id });
        return doc._id;
      }
      throw new GraphQLError("You must enter one or more identifier(s)");
    }
  }
  return CrudResolverHost;
}
