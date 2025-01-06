# 3D Cube Project

This project uses **Next.js** with **Three.js** to create a 3D cube that can be interacted with in the browser Users can : 
1.Toggle between a cube, sphere, and cylinder.
2.Move the object using arrow keys.
3.Change the object's color interactively.
4.Achieve a perfect 100 Lighthouse performance score by optimizing performance.
Below are the instructions for running the project.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Docker](https://www.docker.com/get-started) (for running the project in a container)

## Getting Started

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/stastix/3DCube-.git
cd 3DCube-
```

## Running the Project

Follow these steps to build and run the project:

### 1. Build the Docker Image:

In the root of the project directory, run:

```bash
docker build -t 3d-cube .
```

This will build the Docker image for the project.

### 2. Run the Docker Container:

After building the Docker image, run it with the following command:

```bash
docker run -p 3000:3000 3d-cube
```

This will start the Next.js server inside the Docker container and map port 3000 from the container to port 3000 on your local machine.

### 3. Access the Application

Once the container is running, open your browser and go to:

```bash
http://localhost:3000
```

The application should be accessible at this URL.

### 4. stopping the container

1. List your running Docker containers:

```bash
  docker images

```

2. Find the container ID for 3d-cube

3. Run

```bash
  docker stop <container_id>
```

## Project Details

Built With
Next.js: React framework for production.
Three.js: JavaScript library for creating 3D graphics in the browser.
Docker: Platform for developing, shipping, and running applications in containers.
