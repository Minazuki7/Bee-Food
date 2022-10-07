/* eslint-disable @typescript-eslint/no-explicit-any */
import { isArray } from "lodash";
import { FragmentDefinitionNode, SelectionSetNode } from "graphql";
import { PopulateOptions, Schema } from "mongoose";
import { ObjMap } from "graphql/jsutils/ObjMap";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { schemas } from "@fd-wereact/schemas";

function findDoc(doc: any): any {
  if (!isArray(doc)) return doc;
  return findDoc(doc[0]);
}

function getPopulateObject(
  p: string | { path: string; name: string },
  ref: string,
  info: SelectionSetNode,
  fragments?: ObjMap<FragmentDefinitionNode>,
  populateCondition: Record<string, any> = {}
) {
  const { path, name } = typeof p === "string" ? { path: p, name: p } : p;
  const populateObject: PopulateOptions = {
    path,
    populate: autoPopulate(
      (schemas as any)[ref],
      info,
      fragments,
      populateCondition
    ),
  };
  if (populateCondition[name]) {
    populateObject.match = populateCondition[name];
  }
  return populateObject;
}

function autoPopulate(
  doc: any,
  info?: SelectionSetNode,
  fragments?: ObjMap<FragmentDefinitionNode>,
  populateCondition: Record<string, any> = {},
  parent?: string
): PopulateOptions[] {
  let r: PopulateOptions[] = [];

  info?.selections.forEach((node) => {
    if (node.kind === "FragmentSpread" && fragments) {
      const obj = fragments[node.name.value];
      r = [
        ...r,
        ...autoPopulate(
          doc,
          obj.selectionSet,
          fragments,
          populateCondition,
          parent
        ),
      ];
    } else if (node.kind === "Field" && node.selectionSet) {
      const name = node.name.value;
      const path = parent ? `${parent}.${name}` : name;
      const virtual = doc.virtuals && doc.virtuals[name];
      if (virtual && virtual.options && virtual.options.ref) {
        r.push(
          getPopulateObject(
            name,
            virtual.options.ref,
            node.selectionSet,
            populateCondition
          )
        );
      } else {
        let type: any;
        if (doc) {
          type = doc instanceof Schema ? doc.obj[name] : doc[name];
        }
        if (isArray(type)) type = findDoc(type);
        if (type) {
          if (type.ref || findDoc(type.type).ref) {
            r.push(
              getPopulateObject(
                { path, name },
                type.ref || findDoc(type.type).ref,
                node.selectionSet,
                populateCondition
              )
            );
          } else
            r = [
              ...r,
              ...autoPopulate(
                type,
                node.selectionSet,
                fragments,
                populateCondition,
                path
              ),
            ];
        }
      }
    }
  });
  return r;
}

export default autoPopulate;
