# Discord Email Bridge

Provide a way to send messages to and from Discord via email.

# Configuration

## env variables

- `BRIDGE_DISCORD_TOKEN` discord bot auth token
- `BRIDGE_DISCORD_CHANNEL_ID` ID of the discord channel that we will use

If you are using the SES sender:

- `BRIDGE_SES_REGION` if you are using the SES email sender provider, this is the AWS region to use
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

(:
