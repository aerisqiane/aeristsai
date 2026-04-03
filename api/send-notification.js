export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, body, tokens } = req.body;

  if (!title || !tokens || tokens.length === 0) {
    return res.status(400).json({ error: 'Missing title or tokens' });
  }

  const FCM_SERVER_KEY = process.env.FCM_SERVER_KEY;
  if (!FCM_SERVER_KEY) {
    return res.status(500).json({ error: 'FCM_SERVER_KEY not configured' });
  }

  try {
    const results = await Promise.allSettled(
      tokens.map(token =>
        fetch('https://fcm.googleapis.com/fcm/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=' + FCM_SERVER_KEY
          },
          body: JSON.stringify({
            to: token,
            notification: {
              title,
              body: body || '',
              icon: 'https://pub-f37ac82030a342619327ce748b8d3f37.r2.dev/favicon.png',
              click_action: 'https://aeristsai.vercel.app'
            }
          })
        })
      )
    );

    const succeeded = results.filter(r => r.status === 'fulfilled').length;
    res.status(200).json({ success: true, sent: succeeded, total: tokens.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

