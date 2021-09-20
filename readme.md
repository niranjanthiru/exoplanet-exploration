# About Exoplanet Exploration
This is a simple NodeJs project which uses the Open Exoplanet Catalogue(https://www.kaggle.com/mrisdal/open-exoplanet-catalogue/code), to get insights of the mighty celestial objects.
# Configuration file
All the application related configurations are present in the .env file in the root directory of the project. One can alternatively change the environment variable of the host system(docker) to manipulate these configurations.
* EXOPLANET_DATA_URL - Used to say the URL from which the planets information can be fetched.
* LOG_FILE - Says the location of the logfile.
* PORT - Port on which the service should be listened.
# Logs
All the logs are placed in the server.log file in the project's root directory by default, but this can changed by using the `PORT` configuration variable.
# Deployment using Kubernetes
This deployment approach requires Kubernetes(kubetrl), with minikube for clusturing and Docker for containerization.
First create a clusture with minikube. To utilize all the cores of the CPU, create nodes equals to the number of cores in the host CPU.
```
minikube start --nodes=2
```
Deploy the application to the clusture using deployment.yml in the root directory of the project.
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
docker build . -t exoplanet-image
docker run --name exoplanet-app -p 8080:8080 -d exoplanet-image
```
## Stoping the docker container
The below command is used to stop the docker container
```
docker stop exoplanet-app
```
## Deleting the container and the image
You should delete the existing docker image to deploy a new image of same name. The below two commands removes the image and then removes the container
```
 docker rmi exoplanet-image
 docker rm exoplanet-app
```
# Testing
This project uses jasmine framework to test and all the functionalities and the test cases are placed inside the /spec folder. Running the following command would run the tests
```
npx jasmine
```
# API documentation
OpenAPI specification is used for documenting the API endpoints. All the endpoints are documented in openapi.json. The simplest way to read the API using swagger UI is by importing to swaggers online editor(https://editor.swagger.io).


