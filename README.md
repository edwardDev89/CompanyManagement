## Project Info:

Frontend:
- By using Frontend Angular 17, all component is standalone and I tried involve signal function for this project.
- Guard the route with authguard and authenticate user using realworld api for user management + access token.
- Ag grid for data grid and bootstrap 5 css framework

Backend : .NET8 web api & MSSQL
- Using web api to build the necessary endpoint for company management
- EF core 8 to create the db by code ( add-migration + update db )

Pre-requisite for run the project
Database: Install localDb & sql management studio, then create a dbname, 
Backend: Change the dbname in appSetting.json , default is (localdb)\CompanyManagementDB 
Frontend: run npm i to install the necessary package


