# cvoxel

This is CVoxel repo.

Currently, C-Voxel is a alpha version(only ethereum and polygon mainnet are supported). Beta Release is scheduled for 2Q 2022.

https://testnet.cvoxel.xyz/intro

## local setup

1. clone this repo
2. clone and setup backend repo [cvoxel_backend](https://github.com/cvoxelprotocol/cvoxel-backend)
3. open new terminal and `yarn serve` : start backend's emulator
4. [Ceramic local node](https://developers.ceramic.network/build/cli/installation/) setup
5. open new terminal and `yarn ceramic`: run up local node
6. rewrite **env.sample** -> **env.**
7. `yarn dev`: run cvoxel app
