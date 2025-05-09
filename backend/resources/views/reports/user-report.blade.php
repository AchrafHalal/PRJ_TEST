<!-- resources/views/reports/user-report.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>User Report</title>
</head>
<body>
    <h1>User Report for {{ $user->firstName }} {{ $user->lastName }}</h1>

    <ul>
        @foreach($transactions as $transaction)
            <li>{{ $transaction->type }} - {{ $transaction->amount }} - {{ $transaction->created_at }}</li>
        @endforeach
    </ul>
</body>
</html>
