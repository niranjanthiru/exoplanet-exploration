# About Exoplanet Exploration
This is a simple NodeJs project which uses the Open Exoplanet Catalogue(https://www.kaggle.com/mrisdal/open-exoplanet-catalogue/code), to get insights into the mighty celestial objects. The lastest version of the application is deployed no heroku(https://thawing-woodland-34236.herokuapp.com/exoplanet/orphan).
# Configuration file
All the application related configurations are present in the .env file in the root directory of the project. One can alternatively change the environment variable of the host system(docker) to manipulate these configurations.
* EXOPLANET_DATA_URL - Used to say the URL from which the planets' information can be fetched.
* LOG_FILE - Says the location of the logfile.
* PORT - Port on which the service should listen.
# Logs
All the logs are placed in the server.log file in the project's root directory by default, but this can be changed by using the `PORT` configuration variable.
# Deployment using Kubernetes
This deployment approach requires Kubernetes(kubectl), with minikube for clustering and Docker for containerization.
First, create a cluster with minikube. To utilize all the cores of the CPU, create nodes equals to the number of cores in the host CPU.
```
minikube start --nodes=2
```
Deploy the application to the cluster using deployment.yml in the root directory of the project.
```
kubectl apply -f deployment.yml
```
Running the below command will open the application in a new browser window.
```
minikube service exoplanet-exploration
```
# Deployment using only Docker
The project is dockerized and the below commands can be used to create an image and its container
```
docker build -t exoplanet-image --target prod .
docker run --name exoplanet-app -p 8080:8080 -d exoplanet-image
```
## Stoping the docker container
The below command is used to stop the docker container
```
docker stop exoplanet-app
```
## Deleting the container and the image
You should delete the existing docker image to deploy a new image of the same name. The below two commands removes the image and then removes the container
```
 docker rmi exoplanet-image
 docker rm exoplanet-app
```
# Unit testing
This project uses the jasmine framework to test all the functionalities and the test cases are placed inside the /spec folder.
## Testing using Docker 
This approach only requires Docker to be installed in the host machine. If all the tests are successful, no error is raised.
```
docker build -t exoplanet-image --target test .
```
## Alternate approach
Running the following command would run the tests, but this requires node and required packages to be installed in the host machine.
```
npx jasmine
```
# API documentation
OpenAPI specification is used for documenting the API endpoints. All the endpoints are documented in openapi.json. The simplest way to read the API using swagger UI is by importing to swaggers online editor(https://editor.swagger.io).


