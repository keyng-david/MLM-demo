# Crypto Staking Feature

This directory contains components for the crypto staking feature, which allows users to stake their crypto assets and earn rewards.

## Components

- `CryptoRoute.tsx`: Main route component for the crypto section
- `CryptoStakingDashboard.tsx`: Dashboard showing staking overview and options
- `CryptoAssetCard.tsx`: Card component for displaying individual crypto assets
- `StakingForm.tsx`: Form for staking crypto assets

## Features

- View available crypto assets for staking
- Stake assets with different lock periods and APY rates
- Monitor staked assets and earned rewards
- View staking history

## User Flow

1. User visits the crypto section
2. If not logged in, they are prompted to log in
3. Once logged in, they can view available crypto assets
4. User selects an asset to stake
5. User chooses staking period and amount
6. User confirms staking transaction
7. User can monitor staking rewards in the dashboard
8. User can unstake assets after lock period ends
