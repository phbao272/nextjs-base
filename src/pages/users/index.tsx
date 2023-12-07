import { ModalConfirm } from "@/components/shared/modals";
// import useAxiosAuth from "@/hooks/useAxiosAuth";
import { DataPagination } from "@/libs/types";
import { CustomNextPage } from "@/libs/types/next-page";
import { IPlayer } from "@/libs/types/user";
import { handleError } from "@/libs/utils/common";
import { SEO, USER_STATUS } from "@/libs/utils/contants";
import { Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  MRT_PaginationState,
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { DefaultSeo } from "next-seo";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

const ListUser: CustomNextPage = () => {
  // const request = useAxiosAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [userId, setUserId] = useState<number>();
  const [opened, { close, open }] = useDisclosure(false);

  const columns = useMemo<MRT_ColumnDef<IPlayer>[]>(
    () => [
      {
        accessorKey: "id",
        header: "uid",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
    ],
    []
  );

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      // await request.delete(`/users/${userId}`);

      console.log(`/users/${userId}`);
    },
    onSuccess: () => {
      notifications.show({
        title: "成功",
        message: "削除が成功しました。",
        color: "green",
      });

      close();
      setUserId(undefined);
      refetch();
    },
    onError(error: any) {
      handleError(error);
    },
  });

  const { data, isLoading, isRefetching, refetch } = useQuery<
    DataPagination<IPlayer[]>
  >({
    queryKey: ["users", pathname, pagination, USER_STATUS["APPROVED"]],
    queryFn: async () => {
      // const res = await request.get("users", {
      //   params: {
      //     page: pagination.pageIndex + 1,
      //     perPage: pagination.pageSize,
      //     status: USER_STATUS["APPROVED"],
      //   },
      // });

      // return res.data;

      return {
        data: [
          {
            id: "1",
            name: "test",
            email: "pqbao27",
            created_at: "2021-09-27T08:00:00.000000Z",
          },
          {
            id: "2",
            name: "test",
            email: "pqbao27",
            created_at: "2021-09-27T08:00:00.000000Z",
          },
        ],
        meta: {
          total: 2,
          totalPages: 1,
          currentPage: 1,
          perPage: 50,
        },
      } as DataPagination<IPlayer[]>;
    },
    staleTime: 1000 * 5,
    placeholderData: keepPreviousData,
  });

  const table = useMantineReactTable({
    columns,
    data: data?.data || [],
    enableDensityToggle: false,
    positionActionsColumn: "last",
    renderRowActionMenuItems: ({ row }) => {
      return (
        <>
          <Menu.Item
            onClick={() => {
              router.push(`/users/${row.original.id}`);
            }}
          >
            閲覧
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              open();
              setUserId(Number(row.original.id));
            }}
          >
            削除
          </Menu.Item>
        </>
      );
    },
    enableRowActions: true,

    state: {
      pagination,
      isLoading: isLoading,
      showProgressBars: isRefetching,
    },
    manualPagination: true,
    onPaginationChange: setPagination,
    paginationDisplayMode: "pages",
    positionPagination: "bottom",
    pageCount: data?.meta.totalPages || 0,
    rowCount: data?.meta.total || 0,
    enableFilters: false,
  });

  return (
    <>
      <DefaultSeo {...SEO} title="Users" />
      <MantineReactTable table={table} />

      <ModalConfirm
        opened={opened && !!userId}
        onClose={() => {
          close();
          setUserId(undefined);
        }}
        title={`このユーザーを削除しますか？`}
        isLoading={isPending}
        handleSubmit={() => mutate()}
        color={"red"}
      />
    </>
  );
};

export default ListUser;

ListUser.title = "List user";
