import React, { ComponentType, useCallback, useState, useEffect } from "react";
import { QueryResult, QueryHookOptions } from "@apollo/client";
import {
  matchPath,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";

import { TableItem } from "@components/data-display/Table";
import { List as ListType, ListVariables } from "@requests/generic";
import List from "./List";
import { graphQLResult } from "@utils/graphql";
import { Header } from "@components/data-display/Table";
import { decodeUri, encodeUri } from "@utils/url";
import Create, { GenericMutation, FormProps } from "./Create";
import Update, { GenericLazyGet } from "./Update";
import Modal from "@components/feedback/Modal";
import Delete from "./Delete";
import { RESOURCE } from "@shared/permission";
import Protected from "@components/layout/Protected";
import usePermissions from "@hooks/usePermissions";

export const PER_PAGE = 10;

interface Props<
  K extends string, // List Api Key
  T extends TableItem, // List Item
  V extends ListVariables, // List Variables
  P extends FormProps<C, G>, // Form Props
  GK extends string = never, // Get api key
  C = never, // Create Api Parameter
  G = never // One Item Info
> {
  list: (
    options?: QueryHookOptions<Record<K, ListType<T>>, V>
  ) => QueryResult<Record<K, ListType<T>>, V>;
  headers: Header<T>[];
  create?: GenericMutation<C>;
  get?: GenericLazyGet<Record<GK, G>>;
  update?: GenericMutation<{ id: string } & Partial<C>>;
  Form?: React.ComponentType<P>;
  formProps?: {
    create?: Omit<P, keyof FormProps<C, G>>;
    update?: Omit<P, keyof FormProps<C, G>>;
  };
  delete?: GenericMutation<{ id?: string; ids?: string[] }>;
  formVariant?: "modal" | "page";
  resource: RESOURCE;
}

const Crud = <
  K extends string,
  T extends TableItem,
  V extends ListVariables,
  P extends FormProps<C, G>,
  GK extends string = never,
  C = never,
  G = never
>({
  resource,
  list: useList,
  headers,
  create,
  update,
  get,
  Form,
  formProps: {
    create: createFormProps = {} as Omit<P, keyof FormProps<C, G>>,
    update: updateFormProps = {} as Omit<P, keyof FormProps<C, G>>,
  } = {},
  delete: remove,
  formVariant = "modal",
}: Props<K, T, V, P, GK, C, G>) => {
  // const [canWrite, canDelete] = usePermissions(resource);
  const { canWrite, canDelete } = { canDelete: true, canWrite: true };
  const [{ data, totalPages, page }, setData] = useState({
    page: 0,
    perPage: 0,
    totalPages: 0,
    data: [],
    count: 0,
  } as ListType<T>);
  const path = useResolvedPath(".");
  const location = useLocation();
  const navigate = useNavigate();
  const search = decodeUri(location.search);
  const { data: listData, refetch } = useList({
    variables: { page: Number(search.page) || 1, perPage: 10 } as any,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (listData) {
      const nextData = graphQLResult(listData);
      setData(nextData);
    }
  }, [listData]);

  function onPageChange(page: number) {
    navigate({ search: encodeUri({ ...search, page }) }, { replace: true });
  }

  const onDone = useCallback(() => {
    refetch();
    navigate({ pathname: "." });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderPart(
    element: React.ReactElement,
    condition: boolean,
    p: string
  ) {
    return (variant: "page" | "modal") => {
      if (variant !== formVariant) return null;
      if (!condition) return null;
      if (variant === "page") return <Route path={p} element={element} />;
      return (
        <Modal open={!!matchPath(`${path.pathname}/${p}`, location.pathname)}>
          {element}
        </Modal>
      );
    };
  }

  const renderCreate = renderPart(
    <Create
      onClose={() => navigate(".")}
      onDone={onDone}
      api={create as GenericMutation<C>}
      Form={Form as unknown as ComponentType<FormProps<C, null>>}
      formProps={createFormProps}
    />,
    !!(canWrite && create && Form),
    "add"
  );

  const renderUpdate = renderPart(
    <Update
      onClose={() => navigate(".")}
      get={get as GenericLazyGet<Record<GK, G>>}
      api={update as GenericMutation<{ id: string } & Partial<C>>}
      onDone={onDone}
      Form={Form as unknown as ComponentType<FormProps<unknown, never>>}
      formProps={updateFormProps}
    />,
    !!(canWrite && update && get && Form),
    "update/:id"
  );

  return (
    <Protected resource={resource}>
      <Routes>
        <Route
          path="*"
          element={
            <List
              canUpdate={!!(canWrite && update && get && Form)}
              canCreate={!!(canWrite && create && Form)}
              canDelete={!!(canDelete && remove)}
              onPageChange={onPageChange}
              totalPages={totalPages}
              currentPage={Number(page) || 1}
              data={data}
              headers={headers}
            />
          }
        />
        {renderCreate("page")}
        {renderUpdate("page")}
      </Routes>
      {renderCreate("modal")}
      {renderUpdate("modal")}
      {canDelete && remove && (
        <Modal
          open={!!matchPath(`${path.pathname}/delete/:id`, location.pathname)}
        >
          <Delete
            delete={remove}
            onDone={onDone}
            onClose={() => navigate(".", { replace: true })}
          />
        </Modal>
      )}
    </Protected>
  );
};

export default Crud;
