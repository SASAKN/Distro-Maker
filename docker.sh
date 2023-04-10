script_dir="$(dirname "$(readlink -f "$0")")"
cd ${script_dir}
docker build ./ -t distromaker
docker run -p 1337:1337 distromaker:latest