<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="MHR.Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" lang="en-us">
<head runat="server">
    <title>MHR Dev</title>
    <!-- CSS -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="style/bootstrap.css" />
    <link rel="stylesheet" href="style/style.css" />

    <!-- Scripts -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
    <script src="Scripts/bootstrap.js"></script>
    <script src="Scripts/JavaScript.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <input id="fileUpload" type="file" onchange="upload()" aria-label="upload" />
        <div id="pnlUpdate">


        </div>
    </div>
    </form>
</body>
</html>
