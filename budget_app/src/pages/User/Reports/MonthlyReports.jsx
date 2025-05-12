import React, { useEffect, useState } from "react";
import axios from "axios";

const MonthlyReports = () => {
    const token = localStorage.getItem('token');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/api/reports/months", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setReports(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to load reports", err);
      setLoading(false);
    });
  }, []);

  const getMonthName = (month) => {
    return new Date(0, month - 1).toLocaleString("default", { month: "long" });
  };

  const viewReport = (year, month) => {
  window.open(`http://localhost:8000/api/report/view/${year}/${month}`, "_blank");
};

  const downloadReport = (year, month) => {
    window.open(`http://localhost:8000/api/reports/${year}/${month}?download=true`, "_blank");
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mb-4">Monthly Reports</h2>

      {loading ? (
        <p>Loading...</p>
      ) : reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Month</th>
              <th className="px-4 py-2">Year</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index} className="text-center border-t">
                <td className="px-4 py-2">{getMonthName(report.month)}</td>
                <td className="px-4 py-2">{report.year}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => viewReport(report.year, report.month)}
                  >
                    View
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => downloadReport(report.year, report.month)}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MonthlyReports;
