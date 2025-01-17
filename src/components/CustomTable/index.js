import React from "react";
import { NoData } from "../NoData";
import "./styles.css";
import { formatCurrency, formatPercentage } from "../../utils";

const CustomTable = ({ data, config }) => {
    
    const getColumnData = (row, column) => {
        const value = row[column.dataKey];
        switch(column.type) {
            case 'currency':
                return formatCurrency(value, 'INR');
            case 'percentage':
                return formatPercentage(value);
            default:
                return value;
        };
    };
    
    return (
        <table>
            <thead>
                {config.map((column) => (
                    <th>{column.heading}</th>
                ))}
            </thead>
            <tbody>
                {data.length > 0
                    ? data.map((row) => (
                        <tr>
                            {config.map(column => (
                                <td>{getColumnData(row, column)}</td>
                            ))}
                        </tr>
                    ))
                    : (
                        <tr>
                            <td colSpan="3">
                                <NoData />
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
};

export { CustomTable };
