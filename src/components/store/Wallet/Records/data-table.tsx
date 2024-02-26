"use client"
import React, { useState } from "react"
import { Button } from "app/components/ui/button"
import { Input } from "app/components/ui/input"
import { TrashIcon } from '@heroicons/react/24/outline'
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    VisibilityState
  } from "@tanstack/react-table"

  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "app/components/ui/dropdown-menu"
   
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "app/components/ui/table"
import { deleteRecordMany } from "app/services/MongoDB/actions/deleteRecordMany"

  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    moneyData: any
  }
   
  export function DataTable<TData, TValue>({
    columns,
    data,
    moneyData
  }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
    })
    const getTotal = () => {
    const array = table.getFilteredRowModel().rows.map((element: any) => element.original.cantidad)
    const total = array.reduce((a, b) => a + b, 0)
    return total
   }
   const deleteRecord = async () => {
    const array = table.getFilteredSelectedRowModel().flatRows.map((element: any) => {
      return {
        _id: element.original._id,
        proyecto: element.original.proyecto,
        cantidad: element.original.cantidad
      }
    })
    await deleteRecordMany(array, moneyData)
   }  
    return (
      <div>
        <div className="flex items-center py-4">
        <Input
          placeholder="Filter Proyect"
          value={(table.getColumn("proyecto")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("proyecto")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex gap-2 justify-between py-4 pr-8 px-4 items-center">
          <div>
          <TrashIcon className="w-10 absolute cursor-pointer hover:text-red-500 transition hover:animate-ping duration-1000" onClick={() => deleteRecord()}/>
          <TrashIcon className="w-10 cursor-pointer text-red-500 transition hover:animate-ping duration-1000"/>
          </div>
          <div className="flex items-center gap-2">
            <p>Total:</p>
            <p>{getTotal()} $</p>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      </div>
    )
  }
 