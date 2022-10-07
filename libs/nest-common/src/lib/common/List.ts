/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Field, ObjectType, Int, InputType } from "@nestjs/graphql";
import { Type } from "@nestjs/common";

export interface IPaginatedListType<T> {
  data: T[];
  page: number;
  perPage: number;
  count: number;
  totalPages: number;
}

export function PaginatedList<T>(
  classRef: Type<T>
): Type<IPaginatedListType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedListType<T> {
    @Field((type) => [classRef], { nullable: true })
    data!: T[];

    @Field((type) => Int)
    page!: number;

    @Field((type) => Int)
    perPage!: number;
    @Field((type) => Int)
    count!: number;
    @Field((type) => Int)
    totalPages!: number;
  }
  return PaginatedType as Type<IPaginatedListType<T>>;
}

@InputType()
export class PaginationArgs {
  @Field((type) => Int)
  page: number = 0;
  @Field((type) => Int)
  perPage: number = 10;
  @Field((type) => String)
  sort: string | undefined;
  @Field((type) => Int)
  order: number = -1;
}
