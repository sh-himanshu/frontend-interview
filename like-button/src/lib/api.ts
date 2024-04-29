const url = 'https://www.greatfrontend.com/api/questions/like-button';

export const updateButtonState = async (action: 'like' | 'unlike') => {
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
      }),
    });
    const data = await resp.json();

    return { success: data?.message === 'Success!', message: data?.message as string };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : '' };
  }
};
