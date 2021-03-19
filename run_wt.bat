:: This script starts windows terminal with 3 powershell
:: instances in current directory.

:: Hide input
@echo off

:: sass .\public\scss\:.\public\css --watch
:: tsc --watch
:: nodemon --ignore public . dev

:: Start Windows Terminal
wt -d . -p "Windows Powershell" `; split-pane -d . -p "Windows PowerShell" `; split-pane -H -d . -p "Windows PowerShell"

:: Unhide input
@echo on