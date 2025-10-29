/**
 * Environment Variable Validation Utility
 * Validates required environment variables on application startup
 */

/**
 * Configuration for required environment variables
 */
const envConfig = {
  required: [
    {
      name: 'NODE_ENV',
      description: 'Application environment (development, production, test)',
      defaultValue: 'development',
    },
    {
      name: 'SERVER_PORT',
      description: 'Port number for the server',
      defaultValue: '3000',
    },
  ],
  optional: [
    {
      name: 'FRONTEND_URL',
      description: 'URL of the frontend application',
      defaultValue: 'http://localhost:5173',
    },
    {
      name: 'GEMINI_API_KEY',
      description: 'Google Gemini API key for chatbot',
    },
    {
      name: 'DATABASE_URL',
      description: 'Database connection string',
    },
    {
      name: 'JWT_SECRET',
      description: 'Secret key for JWT token generation',
    },
    {
      name: 'EMAIL_HOST',
      description: 'SMTP host for sending emails',
    },
    {
      name: 'EMAIL_PORT',
      description: 'SMTP port',
    },
    {
      name: 'EMAIL_USER',
      description: 'Email username',
    },
    {
      name: 'EMAIL_PASSWORD',
      description: 'Email password',
    },
  ],
};

/**
 * Validate a single environment variable
 */
const validateEnvVar = (config, isRequired) => {
  const value = process.env[config.name];
  
  if (!value) {
    if (config.defaultValue) {
      process.env[config.name] = config.defaultValue;
      return {
        status: 'default',
        name: config.name,
        value: config.defaultValue,
        description: config.description,
      };
    }
    
    return {
      status: isRequired ? 'missing' : 'optional',
      name: config.name,
      description: config.description,
    };
  }

  return {
    status: 'valid',
    name: config.name,
    value: value.substring(0, 20) + (value.length > 20 ? '...' : ''),
    description: config.description,
  };
};

/**
 * Validate all environment variables
 */
const validateEnv = () => {
  console.log('\n🔍 Validating environment variables...\n');

  const results = {
    valid: [],
    defaults: [],
    missing: [],
    optional: [],
  };

  // Check required variables
  envConfig.required.forEach((config) => {
    const result = validateEnvVar(config, true);
    
    if (result.status === 'valid') {
      results.valid.push(result);
    } else if (result.status === 'default') {
      results.defaults.push(result);
    } else if (result.status === 'missing') {
      results.missing.push(result);
    }
  });

  // Check optional variables
  envConfig.optional.forEach((config) => {
    const result = validateEnvVar(config, false);
    
    if (result.status === 'valid') {
      results.valid.push(result);
    } else if (result.status === 'default') {
      results.defaults.push(result);
    } else {
      results.optional.push(result);
    }
  });

  // Display results
  if (results.valid.length > 0) {
    console.log('✓ Valid environment variables:');
    results.valid.forEach((item) => {
      console.log(`  ✓ ${item.name} - ${item.description}`);
    });
    console.log('');
  }

  if (results.defaults.length > 0) {
    console.log('⚠ Using default values:');
    results.defaults.forEach((item) => {
      console.log(`  ⚠ ${item.name} = ${item.value} (${item.description})`);
    });
    console.log('');
  }

  if (results.optional.length > 0) {
    console.log('ℹ Optional variables not set:');
    results.optional.forEach((item) => {
      console.log(`  ℹ ${item.name} - ${item.description}`);
    });
    console.log('');
  }

  if (results.missing.length > 0) {
    console.log('✖ Missing required environment variables:');
    results.missing.forEach((item) => {
      console.log(`  ✖ ${item.name} - ${item.description}`);
    });
    console.log('');
    console.log('Please set the missing environment variables in your .env file');
    console.log('See .env.example for reference\n');
    
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.log('Running in development mode - continuing with warnings\n');
    }
  } else {
    console.log('✓ All required environment variables are set!\n');
  }

  return results;
};

/**
 * Generate .env.example file based on config
 */
const generateEnvExample = () => {
  const lines = [
    '# Environment Variables Configuration',
    '# Copy this file to .env and fill in your values',
    '',
    '# Required Variables',
    '',
  ];

  envConfig.required.forEach((config) => {
    lines.push(`# ${config.description}`);
    if (config.defaultValue) {
      lines.push(`${config.name}=${config.defaultValue}`);
    } else {
      lines.push(`${config.name}=`);
    }
    lines.push('');
  });

  lines.push('# Optional Variables');
  lines.push('');

  envConfig.optional.forEach((config) => {
    lines.push(`# ${config.description}`);
    lines.push(`${config.name}=`);
    lines.push('');
  });

  return lines.join('\n');
};

module.exports = {
  validateEnv,
  generateEnvExample,
  envConfig,
};
