:: This script starts windows terminal with 2 powershell
:: instances in current directory.

:: Hide input
@echo off

:: Start Windows Terminal
wt -d . -p "Windows Powershell" `; split-pane -d . -p "Windows PowerShell"

:: Unhide input
@echo on