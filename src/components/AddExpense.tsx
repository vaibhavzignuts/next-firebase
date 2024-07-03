import * as React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '@/redux/budgetdata/budgetdataSlice';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { BsXLg } from "react-icons/bs";
import { setExpenseDetails } from '@/redux/budgetdata/budgetdataSlice';

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

    const handleAddExpense = () => {
        if (!expenseNameValid || !expenseAmountValid) {
            alert('Please fill out all fields.');
            return;
        }

        const amount = parseFloat(expenseAmount);
        console.log(expenseAmount);

        dispatch(addExpense({ id: id, expenseAmount: amount }));
        dispatch(setExpenseDetails({ id: id, expenseName, expenseAmount }));

        // Reset form fields after adding expense
        setExpenseName('');
        setExpenseAmount('');
        setExpenseNameValid(false);
        setExpenseAmountValid(false);
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
                <Button className="w-full" onClick={handleAddExpense} disabled={!expenseNameValid || !expenseAmountValid}>
                    Add New Expense
                </Button>
            </CardFooter>
        </Card>
    );
}
