# FinalProject - Petfinder

# Steps to run this Angular project locally:

1. clone server from - https://github.ccs.neu.edu/navyak/CS5610-webdev-spring-Project--server
and run: `WddvProjectApplication` present under src. 

2. clone client from - https://github.ccs.neu.edu/nesaramadhav/Wbdv_5610_Angular_FinalProject_client
and run it using the command: `ng serve`

3. open on browser: http://localhost:4200/
The app will automatically reload if you change any of the source files.

# Connection to Database:

Host: `wbdv-db.cn1rk0k2w2tu.us-east-2.rds.amazonaws.com`

Database: `project`

Username: `admin`

Password: `password`

# User and their roles:
 `Username/password`
 
 1. Admin: `admin/admin`
 2. Adopter: `alice/alice`
 3. Adopter: `bob/bob` 
 4. Facilitator: `charlie/charlie` 
 5. Facilitator: `dan/dan`


# Users and their privileges: 

## `Admin:` 
<p> 1.can view all users, edit their profiles and delete users.
       <p> 2. can view all pets, edit their profile and delete pets.
       <p> 3. can view a listing of users and their adoption status. Can approve/ decline adopter's request to adopt a pet.
       <p> 4. can search for pets based on different attributes such as pet type, color, gender, age etc.
       <p> 5. can view pets and request for adopting them
       <p> 6. can view and edit their profile
       <p> 7. can view the status of their adoption request.
       <p> 8. can favourite other pets.

     
## `Adopter` 
<p> 1. can search for pets based on different attributes such as pet type, color, gender, age etc.
        <p> 2. can view pets and request for adopting them
        <p> 3. can view and edit their profile
        <p> 4. can view the status of their adoption request
        <p> 5. can view other user's profile (but, cannot edit other user's profile) and follow them.
        <p> 6. can favourite other pets.

## `Facilitator`
<p> 1. can view a listing of users and their adoption status. Can approve/ decline adopter's request to adopt a pet.
             <p> 2. can search for pets based on different attributes such as pet type, color, gender, age etc.
             <p> 3. can view pets and request for adopting them
             <p> 4. can view and edit their profile
             <p> 5. can view the status of their adoption request
             <p> 6. can view other user's profile (but, cannot edit other user's profile) and follow them.
             <p> 7. can favourite other pets.
             
# Domain Objects: 


