# Kuberenetes Workshop

This kubernetes workshop will take you through installing a local cluster, how to deploy to that or a remote cluster using a tool provided by Kubernetes called kubectl.

## Local Environment Installation

One of the best ways to get started with Kubernetes is with a local cluster. This will give you a chance to play with all the features and get a good understanding of kubernetes. We are going to be installing [Rancher Desktop](https://rancherdesktop.io/) which is a Docker Desktop drop in replacement. Rancher Desktop comes with a single node [K3S](https://k3s.io/) Kubernetes cluster out of the box. K3S is a small Kubernetes distro and is a fully certified full featured Kubernetes distro with some nice tools out of the box, and can run in almost any environment [including raspberry pis](https://blog.alexellis.io/raspberry-pi-homelab-with-k3sup/).

Something to note before beginning the install process, if you have Docker Desktop installed you need to make sure to stop the daemon and disable it from start up. When you are done with this workshop you can easily go back to it by stoping and removing Rancher Desktop from startup and then start Docker Desktop to get Docker Desktop working again.

To install go to <https://github.com/rancher-sandbox/rancher-desktop/releases/latest> to get the latest stable for you system. Run through the usual installation process for your platform but before running it the first time read the step below to be familiar with initial setup. One more note, for windows folks you need to make sure you have WSL2 enabled and setup on your machine so that way you can set Rancher Desktop to use that WSL environment in the settings after inital setup.

On first run you will get a prompt, dont worry if you miss it because all these settings are configurable after the fact but selecting an API here just makes the process easier and faster. For compatibility we need to select the `dockerd (moby)` option. Everything else as default will be fine and can be skipped. This will make it so the docker api will be used instead of containerd on the cli. There is a lot of tools out in the wild and most support dockerd but the containerd api is still a little lacking for userspace tooling but is the best for server installations and is default for kubernetes under the hood. Though containerd is coming up quickly with userspace tooling so keep an eye out.

![Rancher Desktop Initial Setup Prompt](assets/rancher-prompt.png)

With that installed we need one more tool. We need to install [Tilt](https://tilt.dev/). Tilt is a neat tool that is basically Docker Compose for Kuberenetes. You can find installation steps for your platform at <https://docs.tilt.dev/install.html> and where they say `docker-desktop` for the context you should use `rancher-desktop`. Also as part of the Rancher Desktop install you should already have kubectl which is one of the commands they use for looking up the cluster.

With that you should now have Rancher Desktop installed. Part of that installation comes with kubectl (the command to comuncation with kube clusters), helm, and docker clis. You also now have Tilt installed and we can move on to the next steps.

Optional: install k9s because it makes visualizing easier.

## K8s first steps

Now that we have a cluster up and running and have the tools installed to get going you are probably now wondering how to run something on the cluster. It is both as easy as running `docker run blah` but it also not very easy to expose services out side of that cluster unless you know what configuration your missing.

TODO

## Spinning up your first kube service

To create our first service we will use tilt to spin up our services for local sample environment with our local cluster. What tilt does it will build out the application containers and any other services needed and then use the kube api to deploy the objects using our Kubenetes object files, it will then watch and hot reload when the app changes. Tilt is a great tool to have for local development. The Kubernetes object files are generated from templates that can be found in the `helm` directory. We will go over those here in a moment. First lets spin up our environment.

Run the following commands in this directory and hit spacebar to open a browser to see it build and deploy the services to the local cluster.

```bash
kubectl create namespace dashboard
kubectl create namespace dev
tilt up
```

After that you should end up with a screen that looks like below.

![Tilt Web Interface](assets/tilt-web.png)

Once the status is all check marks then then the app is running and you can find it at <127-0-0-1.sslip.io>. If you ran into issues you can click into the deployments and see if there is any logs to guide you.

### Helm Charts

todo

## Multiple application or Environment deployment

todo

## Final thoughts

todo
