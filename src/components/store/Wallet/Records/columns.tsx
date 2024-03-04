'use client'
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "app/components/ui/button"
import { Checkbox } from "app/components/ui/checkbox"
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { ChevronUpIcon } from '@heroicons/react/24/solid'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "app/components/ui/dropdown-menu"
import { useState } from "react"
import { AddRecord } from "./addRecord"
import { getOneRecord } from "app/services/MongoDB/actions/getOneRecord"
import { newRecord } from "app/services/MongoDB/actions/newRecord"
import dayjs from "dayjs"

export type Record = {
    _id: string
    nombre: string
    cantidad: string
    proyecto: string
    category: string
    createdAt: string,
  }
   
export const columns: ColumnDef<Record>[] = [
{
  id: "select",
  header: ({ table }) => {
    return (
      <div className="flex gap-4 items-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <div className="flex-1 text-sm text-muted-foreground w-12">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
    )
    },
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
},
{
    accessorKey: "proyecto",
    header: ({ column }) => {
        return (
            <div className="flex justify-start">
                <Button 
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === `asc`)}
                >
                
                <div>Proyecto</div>
                <div>
                    <ChevronUpIcon className="ml-2 h-4 w-4"/>
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                </div>
            </Button>
            </div>
        )}
},
{
    accessorKey: "category",
    header: ({ column }) => {
        return (
            <div className="flex justify-start">
                <Button 
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === `asc`)}
                >
                
                <div>Category</div>
                <div>
                    <ChevronUpIcon className="ml-2 h-4 w-4"/>
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                </div>
            </Button>
            </div>
        )},
        cell: ({ row }) => {
            const cantidad: string = row.getValue("category")
            return <div className="pl-4">{cantidad}</div>
          }, 
},
{
    accessorKey: "nombre",
    header: ({ column }) => {
        return(
            <div className="flex justify-start">
                <Button 
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === `asc`)}
                >
                
                <div>Nombre</div>
                <div>
                    <ChevronUpIcon className="ml-2 h-4 w-4"/>
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                </div>
                </Button>
            </div>
        )} ,
        cell: ({ row }) => {
            const cantidad: string = row.getValue("nombre")
            return <div className="pl-4">{cantidad}</div>
          },
},
{
    accessorKey: "createdAt",
    header: ({ column }) => {
        return(
            <div className="flex justify-start">
                <Button 
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === `asc`)}
                >
                
                <div>M/D/Y HR (Date)</div>
                <div>
                    <ChevronUpIcon className="ml-2 h-4 w-4"/>
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                </div>
                </Button>
            </div>
        )} ,
},
{
    accessorKey: "cantidad",
    header: ({ column }) => {
    return (
        <div className="flex justify-end">
            <Button 
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === `asc`)}
            >
            
            <div className=''>Cantidad</div>
            <div>
                <ChevronUpIcon className="ml-2 h-4 w-4"/>
                <ChevronDownIcon className="ml-2 h-4 w-4" />
            </div>
        </Button>
        </div>
    )},
    cell: ({ row }) => {
        const cantidad = parseFloat(row.getValue("cantidad"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(cantidad)
   
        return <div className="text-right font-medium pr-4">{formatted}</div>
      },  
},
{
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      const [open, setOpen] = useState(false)
      const [record, setRecord] = useState({})


      const execute = async (id: string, edit?: boolean) => {
        const data = await getOneRecord(id) 
        setRecord(data)
        if(edit) {
          setOpen((prev: boolean) => !prev)
        }
        if(!edit) {
          await newRecord(data)
        }
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              execute(payment._id, false)
              }}
            >Clone Record</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              execute(payment._id, true)
              }}
            >Edit Record</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
            {
              open &&
                <AddRecord record={record} setOpen={setOpen} id={payment._id}/>
            }
        </DropdownMenu>
      )
    },
    
  },
]

