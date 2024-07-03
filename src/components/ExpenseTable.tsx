import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useSelector } from 'react-redux';
import { selectExpensesByBudgetId } from '@/redux/budgetdata/budgetdataSlice';
import { useParams } from 'next/navigation';

interface Expense {
    name: string;
    amount: number;
    dateCreated: Date;
}

export function ExpenseTable() {
    const { id } = useParams<{ id: string }>();
    const expenses = useSelector((state: any) => selectExpensesByBudgetId(state, id));
    const totalexpense = expenses.map((expense) => expense.expenseAmount)
    const sum = totalexpense.map(parseFloat)
        .reduce((acc, current) => acc + current, 0);


    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date Created</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {expenses.map((expense, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{expense?.expenseName
                            }</TableCell>
                            <TableCell>{expense?.expenseAmount
                            }</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>{sum}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>

    );
}