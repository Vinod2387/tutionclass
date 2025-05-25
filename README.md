# Kubeadm Installation Guide

## Prerequisites

- Ubuntu OS [Ubuntu Server 22.04 LTS (HVM),SSD Volume Type]
- `sudo` privileges
- Internet access
- t2.medium instance type or higher

---

## AWS Setup

1. Ensure that all instances are in the same **Security Group**.
2. Expose port **6443** in the **Security Group** to allow worker nodes to join the cluster.
3. Expose port **22** in the **Security Group** to allows SSH access to manage the instance..


## To do above setup, follow below provided steps

### Step 1: Identify or Create a Security Group

1. **Log in to the AWS Management Console**:
    - Go to the **EC2 Dashboard**.

2. **Locate Security Groups**:
    - In the left menu under **Network & Security**, click on **Security Groups**.

3. **Create a New Security Group**:
    - Click on **Create Security Group**.
    - Provide the following details:
      - **Name**: (e.g., `Kubernetes-Cluster-SG`)
      - **Description**: A brief description for the security group (mandatory)
      - **VPC**: Select the appropriate VPC for your instances (default is acceptable)

4. **Add Rules to the Security Group**:
    - **Allow SSH Traffic (Port 22)**:
      - **Type**: SSH
      - **Port Range**: `22`
      - **Source**: `0.0.0.0/0` (Anywhere) or your specific IP

    - **Allow Kubernetes API Traffic (Port 6443)**:
      - **Type**: Custom TCP
      - **Port Range**: `6443`
      - **Source**: `0.0.0.0/0` (Anywhere) or specific IP ranges

5. **Save the Rules**:
    - Click on **Create Security Group** to save the settings.

### Step 2: Select the Security Group While Creating Instances

- When launching EC2 instances:
  - Under **Configure Security Group**, select the existing security group (`Kubernetes-Cluster-SG`)

> Note: Security group settings can be updated later as needed.

---


## Execute on Both "Master" & "Worker" Nodes

1. **Disable Swap**: Required for Kubernetes to function correctly.
    ```bash
    sudo swapoff -a
    ```

2. **Load Necessary Kernel Modules**: Required for Kubernetes networking.
    ```bash
    cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
    overlay
    br_netfilter
    EOF

    sudo modprobe overlay
    sudo modprobe br_netfilter
    ```

3. **Set Sysctl Parameters**: Helps with networking.
    ```bash
    cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
    net.bridge.bridge-nf-call-iptables  = 1
    net.bridge.bridge-nf-call-ip6tables = 1
    net.ipv4.ip_forward                 = 1
    EOF

    sudo sysctl --system
    lsmod | grep br_netfilter
    lsmod | grep overlay
    ```

4. **Install Containerd**:
    ```bash
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    sudo apt-get update
    sudo apt-get install -y containerd.io

    containerd config default | sed -e 's/SystemdCgroup = false/SystemdCgroup = true/' -e 's/sandbox_image = "registry.k8s.io\/pause:3.6"/sandbox_image = "registry.k8s.io\/pause:3.9"/' | sudo tee /etc/containerd/config.toml

    sudo systemctl restart containerd
    sudo systemctl status containerd
    ```

5. **Install Kubernetes Components**:
    ```bash
    sudo apt-get update
    sudo apt-get install -y apt-transport-https ca-certificates curl gpg

    curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

    echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

    sudo apt-get update
    sudo apt-get install -y kubelet kubeadm kubectl
    sudo apt-mark hold kubelet kubeadm kubectl
    ```

### Execute ONLY on the "Master" Node

1. **Initialize the Cluster**:
    ```bash
    sudo kubeadm init
    ```

2. **Set Up Local kubeconfig**:
    ```bash
    mkdir -p "$HOME"/.kube
    sudo cp -i /etc/kubernetes/admin.conf "$HOME"/.kube/config
    sudo chown "$(id -u)":"$(id -g)" "$HOME"/.kube/config
    ```

3. **Install a Network Plugin (Calico)**:
    ```bash
    kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.26.0/manifests/calico.yaml
    ```

4. **Generate Join Command**:
    ```bash
    kubeadm token create --print-join-command
    ```

> Copy this generated token for next command.

---

### Execute on ALL of your Worker Nodes

1. Perform pre-flight checks:
    ```bash
    sudo kubeadm reset pre-flight checks
    ```

2. Paste the join command you got from the master node and append `--v=5` at the end:
    ```bash
    sudo kubeadm join <private-ip-of-control-plane>:6443 --token <token> --discovery-token-ca-cert-hash sha256:<hash> --cri-socket 
    "unix:///run/containerd/containerd.sock" --v=5
    ```

    > **Note**: When pasting the join command from the master node:
    > 1. Add `sudo` at the beginning of the command
    > 2. Add `--v=5` at the end
    >
    > Example format:
    > ```bash
    > sudo <paste-join-command-here> --v=5
    > ```

---

### Verify Cluster Connection

**On Master Node:**

```bash
kubectl get nodes

```

   <img src="https://raw.githubusercontent.com/faizan35/kubernetes_cluster_with_kubeadm/main/Img/nodes-connected.png" width="70%">

---

### Verify Container Status on Worker Node
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/106548243/356852724-c3d3732f-5c99-4a27-a574-86bc7ae5a933.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20241217%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241217T113912Z&X-Amz-Expires=300&X-Amz-Signature=7a5a38a006bb504d47ccd2c35a0f6799c03ea7974e9794661a744f866bf3a6ca&X-Amz-SignedHeaders=host" width="70%">
<img src="https://github.com/user-attachments/assets/c3d3732f-5c99-4a27-a574-86bc7ae5a933" width="70%">

##### Check environment variable in the Project:
```bash
ls -la
```


## Create Namespace:
```bash
kubectl create namespace walrust
```

## Make walrust namespace as Default namespace:
```bash
kubectl config set-context --current --namespace walrust
``` 

## Enable DNS resolution on kubernetes cluster (Don't try this)

 - Check coredns pods in kube-system namespace and you will find both the pods are running on master nodes.

```bash
kubectl get pods -n kube-system -o wide | grep -i core
```
 - Following step will run core DNS pods in Master and worker both. (Don't try this)

 ```bash
 kubectl edit deploy coredns -n kube-system -o yaml
 ```

 - Make replica count 2 to 4 here.

 ### Check now: (Don't try)
 ```bash 
kubectl get pods -n kube-system -o wide | grep -i core
```

### Install Docker on Master and Worker Nodes:
```bash
sudo apt install docker.io -y

sudo chmod 777 /var/run/docker.sock

sudo usermod -aG docker ubuntu

newgrp docker

sudo chmod 777 /var/run/docker.sock
```
## Edit .env.docker file and change the public ip address with your worker node public ip:(For Walrus Project Only)
```bash
vim .env.docker
```

## Create Sonar container:
```bash
docker run -d --name sonar -p 9000:9000 sonarqube:lts community
```
## Install Trivy:
```bash
vim trivy.sh
sudo apt-get install wget apt-transport-https gnupg lsb-release -y
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install trivy -y
:wq
```
### Give executable permission to above shell script:
```bash
sudo chmod +x trivy.sh
```
### Run the script:
```bash
sh trivy.sh
```
## Email Integration With Jenkins and Plugin Setup

- Install Email Extension Plugin in Jenkins

 ![Reference Image](/images/Screenshot%20from%202025-05-24%2006-50-32.png)

 - Go to your Gmail and click on your profile

 - Then click on Manage Your Google Account –> click on the security tab on the left side panel you will get this page(provide mail password).
 
 ![Reference Image](/images/Screenshot%20from%202025-05-24%2006-47-31.png)

  - step verification should be enabled.

  - Search for the app in the search bar you will get app passwords like the below image

 ![Reference Image](/images/Screenshot%20from%202025-05-24%2006-54-36.png) 

 ![Reference Image](/images/Screenshot%20from%202025-05-24%2006-55-32.png)

  - Click on other and provide your name and click on Generate and copy the password

 ![Reference Image](/images/Screenshot%20from%202025-05-24%2006-58-08.png)

  - In the new update, you will get a password like this

 ![Reference Image](/images/Screenshot%20from%202025-05-24%2006-59-59.png) 

  - Once the plugin is installed in Jenkins, click on manage Jenkins –> configure system there under the E-mail Notification section configure the details as shown in the below image

 ![Reference Image](/images/Screenshot%20from%202025-05-24%2007-02-11.png)

 - Click on Apply and save.

 - Click on Manage Jenkins–> credentials and add your mail username and generated password

 ![Reference Image](/images/Screenshot%20from%202025-05-24%2007-04-19.png)

 - This is to just verify the mail configuration

 - Now under the Extended E-mail Notification section configure the details as shown in the below images

 ![Reference Image](/images/Screenshot%20from%202025-05-24%2007-06-25.png)

 ![Reference Image](/images/Screenshot%20from%202025-05-24%2007-08-05.png)

 - Click on Apply and save.

 ### Insert in Jenkins Pipeline:
```bash
 post {
     always {
        emailext attachLog: true,
            subject: "'${currentBuild.result}'",
            body: "Project: ${env.JOB_NAME}<br/>" +
                "Build Number: ${env.BUILD_NUMBER}<br/>" +
                "URL: ${env.BUILD_URL}<br/>",
            to: 'postbox.aj99@gmail.com',  #change Your mail
            attachmentsPattern: 'trivyfs.txt,trivyimage.txt'
        }
    }
```
### Configure Sonar Server in Manage Jenkins
 - Grab the Public IP Address of your EC2 Instance, Sonarqube works on Port 9000, so <Public IP>:9000. Goto your Sonarqube Server. Click on Administration → Security → Users → Click on Tokens and Update Token → Give it a name → and click on Generate Token
 

![Reference Image](/images/Screenshot%20from%202025-05-24%2007-40-15.png)

- Create a token with a name and generate

![Reference Image](/images/Screenshot%20from%202025-05-24%2007-16-04.png)

- copy Token

- Goto Jenkins Dashboard → Manage Jenkins → Credentials → Add Secret Text. It should look like this

![Reference Image](/images/Screenshot%20from%202025-05-24%2007-43-01.png)

- You will see this page once you click on create

![Reference Image](/images/Screenshot%20from%202025-05-24%2007-46-08.png)

- Now, go to Dashboard → Manage Jenkins → System and Add like the below image.

![Reference Image](/images/Screenshot%20from%202025-05-24%2007-47-29.png)

- Click on Apply and Save

- The Configure System option is used in Jenkins to configure different server

- Global Tool Configuration is used to configure different tools that we install using Plugins

- We will install a sonar scanner in the tools.

![Reference Image](/images/Screenshot%20from%202025-05-24%2007-49-23.png)

- In the Sonarqube Dashboard add a quality gate also

- Administration–> Configuration–> Webhooks

![Reference Image](/images/Screenshot%20from%202025-05-24%2007-50-38.png)

- Click on Create.

![Reference Image](/images/Screenshot%20from%202025-05-24%2007-51-52.png)

- Add details.

```bash
#in url section of quality gate
<http://jenkins-public-ip:8080>/sonarqube-webhook/
```

![Reference Image](/images/Screenshot%20from%202025-05-24%2007-52-58.png)

- To see the report, you can go to Sonarqube Server and go to Projects.

![Reference Image](/images/Screenshot%20from%202025-05-24%2007-54-26.png)

- First, we configured the Plugin and next, we had to configure the Tool

- Goto Dashboard → Manage Jenkins → Tools →

![Reference Image](/images/Screenshot%20from%202025-05-24%2007-57-20.png)

- Click on Apply and Save here.


- Now go configure → Pipeline and add this stage to your pipeline and build.

  ```bash
  stage('OWASP FS SCAN') {
            steps {
                dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'DP-Check'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
        stage('TRIVY FS SCAN') {
            steps {
                sh "trivy fs . > trivyfs.txt"
            }
        }
```

### Docker Image Build and Push
We need to install the Docker tool in our system, Goto Dashboard → Manage Plugins → Available plugins → Search for Docker and install these plugins

- Docker

- Docker Commons

- Docker Pipeline

- Docker API

- docker-build-step

### Now, goto Dashboard → Manage Jenkins → Tools →

![Reference Image](/images/Screenshot%20from%202025-05-24%2008-04-16.png)


- Add DockerHub Username and Password under Global Credentials

![Reference Image](/images/Screenshot%20from%202025-05-24%2008-07-20.png)

### Insert following block in Pipeline:
```bash
stage("Docker Build & Push"){
            steps{
                script{
                   withDockerRegistry(credentialsId: 'docker', toolName: 'docker'){
                       sh "docker build --build-arg TMDB_V3_API_KEY=Aj7ay86fe14eca3e76869b92 -t netflix ."
                       sh "docker tag netflix sevenajay/netflix:latest "
                       sh "docker push sevenajay/netflix:latest "
                    }
                }
            }
        }
        stage("TRIVY"){
            steps{
                sh "trivy image sevenajay/netflix:latest > trivyimage.txt"
            }
        }

        stage('Deploy to container'){
            steps{
                sh 'docker run -d --name netflix -p 8081:80 sevenajay/netflix:latest'
            }
        }
```

## Kubeconfig file on the master node:

```bash
cat ~/.kube/config
```
### Copy the Kubeconfig file to Jenkins master or the local file manager and save it.


![Reference Image](/images/Screenshot%20from%202025-05-24%2008-18-21.png)

- Install Kubernetes Plugin, Once it’s installed successfully

![Reference Image](/images/Screenshot%20from%202025-05-24%2008-22-17.png)

 - goto manage Jenkins –> manage credentials –> Click on Jenkins global –> add credentials

![Reference Image](/images/Screenshot%20from%202025-05-24%2008-24-37.png)

 - Deploy on the Kubernetes cluster

 ```bash
 stage('Deploy to kubernets'){
            steps{
                script{
                    dir('Kubernetes') {
                        withKubeConfig(caCertificate: '', clusterName: '', contextName: '', credentialsId: 'k8s', namespace: '', restrictKubeConfigAccess: false, serverUrl: '') {
                                sh 'kubectl apply -f deployment.yml'
                                sh 'kubectl apply -f service.yml'
                        }
                    }
                }
            }
        }
    }    
}
```

 - In the Kubernetes cluster(master) give this command

 ```bash
 kubectl get all
kubectl get svc
```

![Reference Image](/images/Screenshot%20from%202025-05-24%2008-30-21.png)

# Access from a Web browser with:
```bash
<public-ip-of-slave:service port>
```

# Complete Pipeline:

```bash
pipeline{
    agent any
    tools{
        jdk 'jdk17'
        nodejs 'node16'
    }
    environment {
        SCANNER_HOME=tool 'sonar-scanner'
    }
    stages {
        stage('clean workspace'){
            steps{
                cleanWs()
            }
        }
        stage('Checkout from Git'){
            steps{
                git branch: 'main', url: 'https://github.com/Aj7Ay/Netflix-clone.git'
            }
        }
        stage("Sonarqube Analysis "){
            steps{
                withSonarQubeEnv('sonar-server') {
                    sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=Netflix \
                    -Dsonar.projectKey=Netflix '''
                }
            }
        }
        stage("quality gate"){
           steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                sh "npm install"
            }
        }
        stage('OWASP FS SCAN') {
            steps {
                dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'DP-Check'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
        stage('TRIVY FS SCAN') {
            steps {
                sh "trivy fs . > trivyfs.txt"
            }
        }
        stage("Docker Build & Push"){
            steps{
                script{
                   withDockerRegistry(credentialsId: 'docker', toolName: 'docker'){
                       sh "docker build --build-arg TMDB_V3_API_KEY=AJ7AYe14eca3e76864yah319b92 -t netflix ."
                       sh "docker tag netflix sevenajay/netflix:latest "
                       sh "docker push sevenajay/netflix:latest "
                    }
                }
            }
        }
        stage("TRIVY"){
            steps{
                sh "trivy image sevenajay/netflix:latest > trivyimage.txt"
            }
        }
        stage('Deploy to container'){
            steps{
                sh 'docker run -d --name netflix -p 8081:80 sevenajay/netflix:latest'
            }
        }
        stage('Deploy to kubernets'){
            steps{
                script{
                    dir('Kubernetes') {
                        withKubeConfig(caCertificate: '', clusterName: '', contextName: '', credentialsId: 'k8s', namespace: '', restrictKubeConfigAccess: false, serverUrl: '') {
                                sh 'kubectl apply -f deployment.yml'
                                sh 'kubectl apply -f service.yml'
                        }
                    }
                }
            }
        }
    }
    post {
     always {
        emailext attachLog: true,
            subject: "'${currentBuild.result}'",
            body: "Project: ${env.JOB_NAME}<br/>" +
                "Build Number: ${env.BUILD_NUMBER}<br/>" +
                "URL: ${env.BUILD_URL}<br/>",
            to: 'postbox.aj99@gmail.com',
            attachmentsPattern: 'trivyfs.txt,trivyimage.txt'
        }
    }
}
```
### Change Host-name of Instance:
```bash
sudo hostnamectl set host-name Master
exec host
```

## Install Jenkins on Ubuntu:
```bash
sudo apt update
sudo apt upgrade -y
sudo apt install openjdk-17-jdk -y
curl -fsSL https://pkg.jenkins.io/debian/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt update
sudo apt install jenkins -y
sudo systemctl start jenkins
sudo systemctl enable jenkins
sudo systemctl status jenkins
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```
