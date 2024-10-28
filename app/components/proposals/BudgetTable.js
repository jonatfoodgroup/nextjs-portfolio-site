"use client";
import React from "react";
import DataTable from "react-data-table-component";
import Subheading from "./Subheading";

const Budget = () => {
    return (
        <section id="Budget" className="py-16 ">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
                    <div className="md:w-1/4 mt-8 md:mt-0">
                        <h2 className="text-3xl font-medium mb-2 leading-tight">
                            Budget
                        </h2>
                    </div>
                    <div className="md:w-3/4 mt-8 md:mt-0">
                        <Subheading title="Estimated Project Cost" />
                        <BudgetTable />

                        <div className="flex flex-col mt-8">
                            <Subheading title="Payment Structure" />
                            <p className="text-2xl text-gray-600 leading-relaxed">
                                To ensure smooth progress and commitment from both parties,
                                the payment structure will be as follows:
                            </p>
                            <ul className="text-2xl text-gray-500 leading-relaxed max-w-4xl ml-8 mt-8">
                                <li className="text-gray-500 mb-4">
                                    <span className="font-bold text-black">
                                        Initial Deposit:
                                    </span>{" "}
                                    A non-refundable deposit of 25% of the estimated total
                                    project cost will be required upon signing the contract.
                                    This secures the project start date and covers initial setup
                                    and planning.
                                </li>
                                <li className="text-gray-500 mb-4">
                                    <span className="font-bold text-black">
                                        Bi-Weekly Billing
                                    </span>
                                    Invoices will be issued bi-weekly based on hours worked,
                                    with detailed timesheets provided for transparency. Payments
                                    are due within 14 days of invoice receipt.
                                </li>
                            </ul>

                            <Subheading title="Payment Terms" />
                            <Subheading title="Adjustments & Scope Changes" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const BudgetTable = () => {
    const data = [
        { item: "Redesign site", cost: "$10,000" },
        { item: "Improve site performance", cost: "$5,000" },
        { item: "Improve site accessibility", cost: "$2,000" },
    ];

    const columns = [
        {
            name: "Item",
            selector: "item",
            sortable: false,
        },
        {
            name: "Cost",
            selector: "cost",
            sortable: false,
        },
    ];

    return (
        <DataTable columns={columns} pagination highlightOnHover pointerOnHover />
    );
};

export default Budget;