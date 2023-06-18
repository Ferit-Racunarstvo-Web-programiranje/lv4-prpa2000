<?php
session_start();

$adminEmail = 'admin@admin.com';
$adminPassword = 'admin123';

if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in']) {
    header("Location: dashboard.php");
    exit;
}

if (isset($_POST['email']) && isset($_POST['password'])) {
    $submittedEmail = $_POST['email'];
    $submittedPassword = $_POST['password'];

    if ($submittedEmail === $adminEmail && $submittedPassword === $adminPassword) {
        $_SESSION['admin_logged_in'] = true;
        $cookieName = 'admin_login';
        $cookieValue = base64_encode($adminEmail);
        setcookie($cookieName, $cookieValue, time() + (86400 * 30), "/");
        header("Location: dashboard.php");
        exit;
    } else {
        $error = "Pogrešan e-mail ili lozinka";
    }
}

if (isset($_COOKIE['admin_login']) && $_COOKIE['admin_login'] === base64_encode($adminEmail)) {
    $_SESSION['admin_logged_in'] = true;
    header("Location: dashboard.php");
    exit;
}
?>


<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            background-color: #f1f1f1;
            font-family: Arial, sans-serif;
        }

        .login-container {
            max-width: 400px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border: 2px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

        }

        h2 {
            text-align: center;
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 10px;
        }

        input[type="email"],
        input[type="password"] {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        input[type="submit"] {
            background-color: #4CAF50;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        input[type="submit"]:hover {
            background-color: #45a049;
        }

        .error-message {
            color: red;
            margin-bottom: 10px;
        }
    </style>
</head>

<body>
    <div class="login-container">
        <h2>Admin Login</h2>
        <?php if (isset($error)) : ?>
            <div class="error-message"><?php echo $error; ?></div>
        <?php endif; ?>
        <form method="post">
            <label for="email">Email:</label>
            <input type="email" name="email" required><br>
            <label for="password">Password:</label>
            <input type="password" name="password" required><br>
            <input type="submit" value="Login">
        </form>
    </div>
</body>

</html>