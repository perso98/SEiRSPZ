# SEiRSPZ

This is the diploma project.
The diploma thesis was intended to create an application to supervise the course of student apprenticeships and support the creation of apprenticeship documentation. The application is intended for trainees who describe the activity of each day of practice in the electronic journal of apprenticeships, company supervisors accepting the entries of apprentices in the journal, university supervisors verifying the achievement of learning outcomes, as well as for employees of the dean's office and the management of the institute organizing apprenticeship by assigning workplaces and supervisors to apprentices . The application has a number of other useful functions supporting the organization and documentation of practices.

The scope of Maciej Sierżęga's (perso98) work included:
- creating a login and registration system,
- creating user sessions and securing access,
- creating the ability to edit one's own account (password),
- creating functionality for the following profiles:
- Administrator,
- Plant Supervisor,
- University Supervisor.
The login and registration system allows the user to create their own account and log in to the application.
User sessions and access security are meant to protect the application from unauthorized users.
The ability to edit one's own account allows the user to change their account password.
The administrator profile has the ability to assign roles to the user, change their login details, create a user and delete a user.
The plant supervisor and university supervisor profiles are meant to evaluate the days from the diary assigned to their students. Supervisors have the ability to accept or reject a given day, change the description of the day and add a comment.

Running project
- cd client
- npm start
- cd ..
- cd server
- node server
