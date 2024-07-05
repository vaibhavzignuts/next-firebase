
'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { updateBudget, settotalAmount, setExpenses } from '@/redux/budgetdata/budgetdataSlice';

import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function AddExpense() {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const { budgets } = useSelector((state: any) => state.budgetData);

    const [expenseName, setExpenseName] = React.useState('');
    const [expenseAmount, setExpenseAmount] = React.useState<number | ''>('');

    const [expenseNameValid, setExpenseNameValid] = React.useState(false);
    const [expenseAmountValid, setExpenseAmountValid] = React.useState(false);

    const handleExpenseNameChange = (value: string) => {
        setExpenseName(value);
        setExpenseNameValid(value.trim().length > 0);
    };

    const handleExpenseAmountChange = (value: string) => {
        setExpenseAmount(value);
        setExpenseAmountValid(value.trim().length > 0);
    };


    useEffect(() => {
        const getExpenses = async () => {
            try {

                const expensesSnapshot = await getDocs(collection(db, 'budget', id, 'expense'));
                const updatedExpenses = expensesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                dispatch(setExpenses(updatedExpenses));

            } catch (error) {
                console.error("Error fetching expenses:", error.message);

            }
        };

        if (id) {
            getExpenses();
        }

    }, []);



    const addExpense = async () => {
        const amount = parseFloat(expenseAmount);

        const expenseData = {
            expenseName,
            expenseAmount: amount
        };

        try {
            // Add the expense to the budget
            const expensesRef = collection(db, 'budget', id, 'expense');
            const expenseDocRef = await addDoc(expensesRef, expenseData);

            // Update the budget after adding the new expense document
            const budgetRef = doc(db, 'budget', id);
            const budgetDoc = await getDoc(budgetRef);
            if (budgetDoc.exists()) {
                const currentTotalAmount = budgetDoc.data().budgetAmount;
                const newTotalAmount = currentTotalAmount - amount;

                // Update currentBudgetAmount in Redux state
                dispatch(updateBudget({ id, newTotalAmount }));

                await updateDoc(budgetRef, {
                    budgetAmount: newTotalAmount,

                });



                const expensesSnapshot = await getDocs(collection(db, 'budget', id, 'expense'));
                const updatedExpenses = expensesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                dispatch(setExpenses(updatedExpenses));

            } else {
                console.error("Budget document not found");
            }

            setExpenseName('');
            setExpenseAmount('');
            setExpenseNameValid(false);
            setExpenseAmountValid(false);

        } catch (error) {
            console.error("Error adding expense:", error.message);
        }
    };


    return (
        <Card className="w-[600px] h-[270px]">
            <CardHeader>
                <CardTitle>Add Expense</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Expense Name</Label>
                            <Input
                                id="name"
                                placeholder="Add your expense here"
                                value={expenseName}
                                onChange={(e) => handleExpenseNameChange(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="amount">Expense Amount</Label>
                            <Input
                                id="amount"
                                placeholder="Add amount of your expense"
                                type="number"
                                value={expenseAmount}
                                onChange={(e) => handleExpenseAmountChange(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button className="w-full" onClick={addExpense} disabled={!expenseNameValid || !expenseAmountValid}>
                    Add New Expense
                </Button>
            </CardFooter>
        </Card>
    );
}
