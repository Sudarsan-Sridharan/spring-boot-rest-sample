# Overview
A Sample Spring Boot Project using Spring Boot, Webpack and Reactjs.  
The project will create some sample data at startup if it does not already exist.  


## Configuration
The project supports the following configuration options which can be configured via spring boot.  These properties reside in application.properties.


Sets the uploadFolder. By default this is relative to the run directory
app.media.uploadFolder=uploaded

If true the application will replace the file name with a uuid.
app.media.useUUID=true



## Considerations
The user is required to enter the title and description rather than extract it from the uploaded file.

The application lacks many features expected in production, such as rate limiting, caching etc. 

An important consideration is file upload.  Currently the file is uploaded as multipart data as this is the simplest approach.  
There are other approaches to implementing this such as:

* Encoding the data file as base64 (increases file size) and uploading it as part of the JSON request.
* Using the XHR2

Since the form is posted as multipart data, the Rest API that processes the request, expects this format.  In this case this is not the cleanest approach.


The file storage is abstracted by a MediaStore service.  This allows the underlying file store to be swapped out such as using Amazon EC2 etc.



## Running Project
The project can be executed following the normal spring root conventions.  
A built jar file is also provided in the dist directory until the frontend-maven-plugin is included in the build file (see Todo).

To run the application from the commandline java -jar dist/spring-boot-sample-filemanager-0.0.1-SNAPSHOT.jar 




## Todo
Add frontend-maven-plugin to maven build, to simplify managing node dependencies as part of build process. 
The node dependencies are not checked in, as a result to build the project node is required to be installed in order to build the project.  
Improve the UI.
Add Links (i.e. hateoas to the data returned from the rest api to simplify building the download links).
Add Client side validation, and better error reporting
Add configuration option for allowed ext.





