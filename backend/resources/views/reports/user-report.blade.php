<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Income and Expense Report</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 30px;
            color: #333;
        }

        h2 {
            text-align: center;
            margin-bottom: 10px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .form-section {
            margin: 20px 0;
        }

        .form-section label {
            font-weight: bold;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }

        table thead {
            background-color: #f0f0f0;
        }

        table th, table td {
            border: 1px solid #999;
            padding: 8px;
            text-align: left;
        }

        .total-row td {
            font-weight: bold;
            background-color: #f9f9f9;
        }

        .section-title {
            font-size: 16px;
            margin-bottom: 10px;
            font-weight: bold;
        }

        .notes {
            margin-top: 20px;
        }
    </style>
</head>
<body>

    <h2>Income and Expense Report Template</h2>

    <div class="form-section">
        <p><strong>Department:</strong> Finance</p>
        <p><strong>Period:</strong> {{ now()->format('F Y') }}</p>
        <p><strong>Prepared By:</strong> {{ $user->name }}</p>
    </div>

    <div class="section-title">Income</div>
    <table>
        <thead>
            <tr>
                <th>Sr No.</th>
                <th>Description</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach($incomeItems as $index => $item)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $item['description'] }}</td>
                <td>${{ number_format($item['amount'], 2) }}</td>
            </tr>
            @endforeach
            <tr class="total-row">
                <td colspan="2">Total Income</td>
                <td>${{ number_format($totalIncome, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <div class="section-title">Expense</div>
    <table>
        <thead>
            <tr>
                <th>Sr No.</th>
                <th>Description</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach($expenseItems as $index => $item)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $item['description'] }}</td>
                <td>${{ number_format($item['amount'], 2) }}</td>
            </tr>
            @endforeach
            <tr class="total-row">
                <td colspan="2">Total Expense</td>
                <td>${{ number_format($totalExpense, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <div class="notes">
        <p><strong>Notes:</strong></p>
        <p>This is a system-generated report for your records.</p>
    </div>

</body>
</html>
