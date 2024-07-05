'use client';
import React, { useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useSelector } from 'react-redux';
interface Expense {
    id: string;
    expenseName: string;
    expenseAmount: number;
    createdAt: Date;
}
interface Props {
    expenses: Expense[];
}

export function ExpenseTable() {
    const { expenses } = useSelector((state: any) => state.budgetData);

    const totalAmount = expenses?.reduce((accumulator, expense) => accumulator + expense.expenseAmount, 0);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {expenses?.map((expense) => (
                    <TableRow key={expense.id}>
                        <TableCell className="font-medium">{expense?.expenseName}</TableCell>
                        <TableCell className="text-right">{expense?.expenseAmount}$</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">{totalAmount}$</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
