"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";

const AccountsPage = () => {
  const { onOpen } = useNewAccount();
  const accountsQuery = useGetAccounts();
  const deleteAccountsQuery = useBulkDeleteAccounts();

  const accounts = accountsQuery.data || [];

  const isDisabled = accountsQuery.isLoading || deleteAccountsQuery.isPending;

  if (accountsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
          <Button onClick={onOpen} size="sm">
            <Plus className="size-4 mr-2" />
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={(rows) => {
              const ids = rows.map((r) => r.original.id);
              deleteAccountsQuery.mutate({ ids });
            }}
            disabled={isDisabled}
            filterKey="name"
            columns={columns}
            data={accounts}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;