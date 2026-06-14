import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import PieChartComponent from "../components/PieChartComponent";
import BarChartComponent from "../components/BarChartComponent";
import Papa from "papaparse";
import { toast } from "react-toastify";

import {

    getExpenses,
    createExpense,
    deleteExpense,
    updateExpense

} from "../services/ExpenseService";

function ExpenseListPage() {

    const [expenses, setExpenses] = useState([]);

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedType, setSelectedType] = useState("");

    const [name, setName] = useState("");

    const [expenseType, setExpenseType] = useState("");

    const [amount, setAmount] = useState("");

    const [date, setDate] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
	
	const [saving, setSaving] = useState(false);
	
	const [darkMode, setDarkMode] = useState(

	    localStorage.getItem("theme") === "dark"

	);

    useEffect(() => {

        fetchExpenses();

    }, [page]);
	
	useEffect(() => {

	    if (darkMode) {

	        document.body.className = "bg-dark text-light";

	        localStorage.setItem(
	            "theme",
	            "dark"
	        );

	    }

	    else {

	        document.body.className = "";

	        localStorage.setItem(
	            "theme",
	            "light"
	        );

	    }

	}, [darkMode]);


    const fetchExpenses = async () => {

        try {

            setLoading(true);

            const response = await getExpenses(page);

            setExpenses(response.content);

            setTotalPages(response.totalPages);

            setLoading(false);

        }

        catch (error) {

            console.log(error);

            setLoading(false);

        }

    };


    const handleAddExpense = async () => {

        try {
			setSaving(true);
            await createExpense({

                name,
                expenseType,
                amount,
                date

            });

			toast.success(
			    "Expense added successfully"
			);
			setSaving(false);

            fetchExpenses();

            setName("");

            setExpenseType("");

            setAmount("");

            setDate("");

        }

        catch (error) {

            console.log(error);
			setSaving(false);
        }

    };


    const handleEdit = (expense) => {

        setEditingId(expense.id);

        setName(expense.name);

        setExpenseType(expense.expenseType);

        setAmount(expense.amount);

        setDate(expense.date);

    };


    const handleUpdate = async () => {

        try {

            await updateExpense(

                editingId,

                {

                    name,
                    expenseType,
                    amount,
                    date

                }

            );

			toast.success(
			    "Expense updated successfully"
			);

            fetchExpenses();

            setEditingId(null);

            setName("");

            setExpenseType("");

            setAmount("");

            setDate("");

        }

        catch (error) {

            console.log(error);

        }

    };


    const handleDelete = async (id) => {

        const confirmed = window.confirm(

            "Are you sure you want to delete this expense?"

        );

        if (!confirmed) {

            return;

        }

        try {

            await deleteExpense(id);

			toast.success(
			    "Expense deleted successfully"
			);

            fetchExpenses();

        }

        catch (error) {

			toast.error(
			    "Something went wrong"
			);

        }

    };
	
	const handleExport = () => {

	    const csv = Papa.unparse(filteredExpenses);

	    const blob = new Blob(
	        [csv],
	        {
	            type: "text/csv;charset=utf-8;"
	        }
	    );

	    const link = document.createElement("a");

	    link.href = URL.createObjectURL(blob);

	    link.download = "expenses.csv";

	    link.click();

	};
	
	if (loading) {

	    return (

	        <div
	            className="
	            d-flex
	            justify-content-center
	            align-items-center
	            vh-100
	            "
	        >

	            <div
	                className="
	                spinner-border
	                text-primary
	                "
	                role="status"
	            >

	                <span
	                    className="
	                    visually-hidden
	                    "
	                >

	                    Loading...

	                </span>

	            </div>

	        </div>

	    );

	}


	const filteredExpenses = expenses.filter(

	    (expense) =>

	        expense.name
	            .toLowerCase()
	            .includes(
	                searchTerm.toLowerCase()
	            )

	        &&

	        (

	            selectedType === ""

	            ||

	            expense.expenseType
	                .toLowerCase() ===

	            selectedType.toLowerCase()

	        )

	);


	const totalExpense = filteredExpenses.reduce(

	    (sum, expense) =>

	        sum + Number(expense.amount),

	    0

	);


	const totalCount = filteredExpenses.length;


	const highestExpense =

	    filteredExpenses.length > 0

	        ?

	        Math.max(

	            ...filteredExpenses.map(

	                expense => Number(expense.amount)

	            )

	        )

	        :

	        0;


	const latestExpense =

	    filteredExpenses.length > 0

	        ?

	        filteredExpenses[0].name

	        :

	        "None";


	return (

	    <>

		<Navbar

		    darkMode={darkMode}

		    setDarkMode={setDarkMode}

		/>

	    <div className="container mt-4">

	    <div className="card shadow mb-4">

	        <div className="card-body">

	            <h3 className="mb-4">

	                {

	                    editingId

	                        ?

	                        "Update Expense"

	                        :

	                        "Add Expense"

	                }

	            </h3>

	            <div className="mb-3">

	                <input
	                    className="form-control"
	                    type="text"
	                    placeholder="Name"
	                    value={name}
	                    onChange={(e) =>
	                        setName(e.target.value)
	                    }
	                />

	            </div>

	            <div className="mb-3">

	                <input
	                    className="form-control"
	                    type="text"
	                    placeholder="Type"
	                    value={expenseType}
	                    onChange={(e) =>
	                        setExpenseType(e.target.value)
	                    }
	                />

	            </div>

	            <div className="mb-3">

	                <input
	                    className="form-control"
	                    type="number"
	                    placeholder="Amount"
	                    value={amount}
	                    onChange={(e) =>
	                        setAmount(e.target.value)
	                    }
	                />

	            </div>

	            <div className="mb-3">

	                <input
	                    className="form-control"
	                    type="date"
	                    value={date}
	                    onChange={(e) =>
	                        setDate(e.target.value)
	                    }
	                />

	            </div>

	            {

	                editingId ?

	                (

	                    <button
	                        className="btn btn-warning"
	                        onClick={handleUpdate}
	                    >

	                        Update Expense

	                    </button>

	                )

	                :

	                (

						<button
						className="btn btn-success"
						onClick={handleAddExpense}
						disabled={saving}
						>

						{

						saving

						?

						"Saving..."

						:

						"Add Expense"

						}

						</button>

	                )

	            }

	        </div>

	    </div>


	    <div className="row mb-3">

	        <div className="col-md-6">

	            <input
	                className="form-control"
	                type="text"
	                placeholder="Search expense..."
	                value={searchTerm}
	                onChange={(e) =>
	                    setSearchTerm(
	                        e.target.value
	                    )
	                }
	            />

	        </div>

	    </div>


	    <div className="row mb-3">

	        <div className="col-md-4">

	            <select
	                className="form-select"
	                value={selectedType}
	                onChange={(e) =>
	                    setSelectedType(
	                        e.target.value
	                    )
	                }
	            >

	                <option value="">

	                    All Types

	                </option>

	                <option value="Food">

	                    Food

	                </option>

	                <option value="Travel">

	                    Travel

	                </option>

	                <option value="Bills">

	                    Bills

	                </option>

	                <option value="Self">

	                    Self

	                </option>

	            </select>

	        </div>

	    </div>


	    <button
	        className="btn btn-secondary mb-4"
	        onClick={() => {

	            setSearchTerm("");

	            setSelectedType("");

	        }}
	    >

	        Clear Filters

	    </button>


	    <div className="row mb-4">

	        <div className="col-md-3">

	            <div className="card text-bg-primary shadow">

	                <div className="card-body">

	                    <h5>

	                        Total Expenses

	                    </h5>

	                    <h3>

	                        ₹{totalExpense}

	                    </h3>

	                </div>

	            </div>

	        </div>


	        <div className="col-md-3">

	            <div className="card text-bg-success shadow">

	                <div className="card-body">

	                    <h5>

	                        No. of Expenses

	                    </h5>

	                    <h3>

	                        {totalCount}

	                    </h3>

	                </div>

	            </div>

	        </div>


	        <div className="col-md-3">

	            <div className="card text-bg-warning shadow">

	                <div className="card-body">

	                    <h5>

	                        Highest Expense

	                    </h5>

	                    <h3>

	                        ₹{highestExpense}

	                    </h3>

	                </div>

	            </div>

	        </div>


	        <div className="col-md-3">

	            <div className="card text-bg-danger shadow">

	                <div className="card-body">

	                    <h5>

	                        Latest Expense

	                    </h5>

	                    <h3>

	                        {latestExpense}

	                    </h3>

	                </div>

	            </div>

	        </div>

	    </div>


	    <div className="row mb-5">

	        <div className="col-md-6">

	            <div className="card shadow">

	                <div className="card-body">

	                    <h4 className="text-center">

	                        Expense Distribution

	                    </h4>

	                    <PieChartComponent
	                        expenses={
	                            filteredExpenses
	                        }
	                    />

	                </div>

	            </div>

	        </div>


	        <div className="col-md-6">

	            <div className="card shadow">

	                <div className="card-body">

	                    <h4 className="text-center">

	                        Expense Comparison

	                    </h4>

	                    <BarChartComponent
	                        expenses={
	                            filteredExpenses
	                        }
	                    />

	                </div>

	            </div>

	        </div>

	    </div>
		
		        <div className="card shadow">

		            <div className="card-body">

		                <h3 className="mb-4">

		                    Expense List

		                </h3>
						
						<button
						    className="btn btn-success mb-3"
						    onClick={handleExport}
						>
						    Export to Excel
						</button>

		                <table className="table table-striped table-hover">

		                    <thead>

		                    <tr>

		                        <th>ID</th>

		                        <th>Name</th>

		                        <th>Type</th>

		                        <th>Amount</th>

		                        <th>Date</th>

		                        <th>Actions</th>

		                    </tr>

		                    </thead>

		                    <tbody>

		                    {

		                        filteredExpenses.length === 0

		                        ?

		                        (

		                            <tr>

		                                <td
		                                    colSpan="6"
		                                    className="text-center"
		                                >

		                                    No expenses found

		                                </td>

		                            </tr>

		                        )

		                        :

		                        (

		                            filteredExpenses.map(

		                                (expense) => (

		                                    <tr key={expense.id}>

		                                        <td>

		                                            {expense.id}

		                                        </td>

		                                        <td>

		                                            {expense.name}

		                                        </td>

		                                        <td>

		                                            {expense.expenseType}

		                                        </td>

		                                        <td>

		                                            ₹{expense.amount}

		                                        </td>

		                                        <td>

		                                            {expense.date}

		                                        </td>

		                                        <td>

		                                            <button
		                                                className="btn btn-primary btn-sm me-2"
		                                                onClick={() =>
		                                                    handleEdit(expense)
		                                                }
		                                            >

		                                                Edit

		                                            </button>

		                                            <button
		                                                className="btn btn-danger btn-sm"
		                                                onClick={() =>
		                                                    handleDelete(expense.id)
		                                                }
		                                            >

		                                                Delete

		                                            </button>

		                                        </td>

		                                    </tr>

		                                )

		                            )

		                        )

		                    }

		                    </tbody>

		                </table>

		            </div>

		        </div>


		        <div className="d-flex justify-content-center mt-4">

		            <button

		                className="btn btn-secondary me-3"

		                disabled={page === 0}

		                onClick={() =>

		                    setPage(page - 1)

		                }

		            >

		                Previous

		            </button>


		            <h5 className="mt-2">

		                Page {page + 1}

		            </h5>


		            <button

		                className="btn btn-secondary ms-3"

		                disabled={page + 1 >= totalPages}

		                onClick={() =>

		                    setPage(page + 1)

		                }

		            >

		                Next

		            </button>

		        </div>

		        </div>

		        </>

		    );

		}

	
   
export default ExpenseListPage;