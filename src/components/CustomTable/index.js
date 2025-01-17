import React from "react";
import { NoData } from "../NoData";
import { formatCurrency, formatPercentage } from "../../utils";
import "./styles.css";

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
                <tr>
                    {config.map((column, idx) => (
                        <th key={idx}>{column.heading}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0
                    ? data.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                            {config.map((column, colIdx) => (
                                <td key={colIdx}>{getColumnData(row, column)}</td>
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
