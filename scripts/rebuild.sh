if [ "$1" == "client" ]; then
	echo "Rebuilding client files and restarting container..!"
    npm run build && docker stop cptnode && docker rm cptnode && docker build -t cptnode . && docker run --name cptnode --network br0 -d cptnode 
elif [ "$1" == "nocontainer" ]; then
    echo "Starting new container.."
    docker build -t cptnode . && docker run --name cptnode --network br0 -d cptnode
else
	echo "Restarting container..!"
    docker stop cptnode && docker rm cptnode && docker build -t cptnode . && docker run --name cptnode --network br0 -d cptnode
fi
