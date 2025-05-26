import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCrown, FaMedal, FaRedo } from 'react-icons/fa';
import RepoTabs from './RepoTabs';

const Leaderboard = ({ repoOwner, repoName, repos, onSelectRepo }) => {
  const [contributors, setContributors] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContributors = async () => {
    setIsLoading(true);
    let attempts = 0;
    let data = [];

    while (attempts < 10) {
      try {
        const res = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/stats/contributors`);
        data = await res.json();
        if (Array.isArray(data) && data.length > 0) break;
      } catch (err) {
        console.error('Fetch error:', err);
      }
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (Array.isArray(data) && data.length > 0) {
      const enriched = data.filter(Boolean).sort((a, b) => b.total - a.total).slice(0, 12).map((contributor, idx) => ({
        id: contributor.author.id,
        login: contributor.author.login,
        avatar_url: contributor.author.avatar_url,
        html_url: contributor.author.html_url,
        contributions: contributor.total,
        commits: contributor.total,
        prs: contributor.weeks.length,
        role: idx === 0 ? 'Top Contributor' : ['Code', 'Docs', 'Design'][idx % 3],
        rank: idx + 1
      }));
      setContributors(enriched);
      setIsValid(true);
    } else {
      setContributors([]);
      setIsValid(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchContributors();
  }, [repoOwner, repoName]);

  const getMedalIcon = (rank) => {
    const style = { marginRight: '0.25rem', verticalAlign: 'middle' };
    if (rank === 1) return <FaMedal style={{ ...style, color: '#facc15' }} title="Gold Medal" />;
    if (rank === 2) return <FaMedal style={{ ...style, color: '#d1d5db' }} title="Silver Medal" />;
    if (rank === 3) return <FaMedal style={{ ...style, color: '#fb923c' }} title="Bronze Medal" />;
    return null;
  };

  return (
    <div style={{
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text)',
      minHeight: '100vh',
      padding: '6rem 2rem',
      fontFamily: 'sans-serif'
    }}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center' }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem' }}>SAST Leaderboard</h1>
      </motion.div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <RepoTabs repos={repos} selectedRepo={{ owner: repoOwner, name: repoName }} onSelect={onSelectRepo} />
      </div>

      <div style={{ marginTop: '4rem', overflowX: 'auto' }}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              border: '8px solid rgba(255, 255, 255, 0.2)',
              borderTop: '8px solid #9fc9ff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : (!isValid || contributors.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No contributors found. Please check back soon.</p>
            <button
              onClick={fetchContributors}
              style={{
                marginTop: '1rem',
                backgroundColor: '#2a2a4f',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              <FaRedo style={{ marginRight: '0.5rem' }} /> Retry
            </button>
          </div>
        ) : (
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <table style={{
              width: '100%',
              fontSize: '1rem',
              textAlign: 'left',
              borderCollapse: 'collapse',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 0,
              tableLayout: 'fixed',
              backgroundColor: 'rgba(13, 13, 43, 0.85)'
            }}>
              <thead>
                <tr style={{
                  background: 'linear-gradient(to right, #00a1ff, #0066cc)',
                  color: '#fff',
                  textShadow: '0 0 4px rgba(0, 161, 255, 0.5)',
                  fontWeight: '600'
                }}>
                  <th style={{ padding: '0.75rem 1rem' }}>#</th>
                  <th style={{ padding: '0.75rem 1rem' }}>User</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Role</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Commits</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Activity</th>
                </tr>
              </thead>
              <tbody>
                {contributors.map((user, idx) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    style={{
                      backgroundColor: '#0d0d2b',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <td style={{ padding: '0.5rem 1rem', fontWeight: '600' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {getMedalIcon(user.rank)}
                        <span>{user.rank}</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.5rem 1rem', fontWeight: '600' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img
                          src={user.avatar_url}
                          alt={user.login}
                          style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', border: '1px solid white' }}
                        />
                        <a
                          href={user.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#e6e6ff', textDecoration: 'underline' }}
                        >
                          {user.login}
                        </a>
                        {user.role === 'Top Contributor' && (
                          <FaCrown style={{ color: '#facc15', marginLeft: '0.5rem' }} title="Top Contributor" />
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '0.5rem 1rem' }}>{user.role}</td>
                    <td style={{ padding: '0.5rem 1rem' }}>{user.commits}</td>
                    <td style={{ padding: '0.5rem 1rem' }}>{user.prs} PRs</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
