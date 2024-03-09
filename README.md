# MineNet (SvelteKit)

Quick and easy way to deploy minecraft servers on your local machine.
`⚠ This website is not designer for cloud hosters ⚠`

## Windows prerequisites ⚠

Find your dockerd location
(It should be in "C:\Program Files\Docker\Docker\resources")

```powershell

cd "C:\Program Files\Docker\Docker\resources"

./dockerd --register-service

```

## Dependencies ⚠

Docker Desktop
- [Docker](https://www.docker.com/)

Or Download Docker using your package manager.

## Building the website


Clone the repositorie then build it!

```bash
npm i

npm run build
```

## Running the website

First, configure your .env file, based on .env.example.

Use the start.cmd/.sh file to run the server, or:
```bash

node -r dotenv/config build

```

## Software Jars

Download your jars from `https://serverjars.com/` or a similar website.
Then put them in your Documents/MNS/jars folder.