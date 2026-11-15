import { getSupabaseClient } from '../config/supabase.js';

export async function getHealth(_request, response) {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from('categories').select('id').limit(1);

    if (error) {
      console.error('Supabase categories health check failed:', error.message);
      return response.status(503).json({
        status: 'degraded',
        server: 'ok',
        database: 'unavailable',
      });
    }

    return response.status(200).json({
      status: 'ok',
      server: 'ok',
      database: 'connected',
    });
  } catch (error) {
    console.error('Health check could not reach Supabase:', error.message);
    return response.status(503).json({
      status: 'degraded',
      server: 'ok',
      database: 'unavailable',
    });
  }
}
