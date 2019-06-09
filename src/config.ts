import { IConfig } from './api/config/IConfig';

export function buildConfig(): IConfig {
  return {
    http: {
      // Note: If you change this, you need to expose it within the built Docker image too
      port: 2000
    },
    discord: {
      token: getEnvVariable('discord_token'),
      channelId: getEnvVariable('discord_channel_id')
    },
    email: {
      ses: {
        region: getEnvVariable('ses_region')
      }
    }
  };
}

function getEnvVariable(name: string): string {
  const key = `BRIDGE_${name.toUpperCase()}`;
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}
