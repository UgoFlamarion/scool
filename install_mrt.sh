# make a `~/.nodes/ folder
mkdir -p ~/.nodes && cd ~/.nodes

# download the binaries from nodejs.org
# in this case, here's the linux version
curl -O http://nodejs.org/dist/v0.10.12/node-v0.10.12-linux-x64.tar.gz

# extract
tar -xzf node-v0.10.12-linux-x64.tar.gz

# rename folder to 0.10.12
mv node-v0.10.12-linux-x64 0.10.12

# create a `current` symlink
ln -s 0.10.12 current

# prepend ~/.nodes/bin to your path
# you'll want to save this in ~/.bashrc or ~/.zshrc or something
export PATH="~/.nodes/current/bin:$PATH"

# cleanup
rm ~/.nodes/node-v0.10.12-linux-x64.tar.gz
