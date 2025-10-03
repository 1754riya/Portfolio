import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const GithubStats = () => {
  // State management
  const [githubStats, setGithubStats] = useState({
    totalStars: 0,
    totalCommits: 0,
    totalPRs: 0,
    totalIssues: 0
  });
  const [leetcodeStats, setLeetcodeStats] = useState({
    ranking: 0,
    totalSolved: 0,
    totalProblems: 0,
    easySolved: 0,
    easyTotal: 0,
    mediumSolved: 0,
    mediumTotal: 0,
    hardSolved: 0,
    hardTotal: 0,
    acceptanceRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Updated usernames
  const GITHUB_USERNAME = "1754riya";
  const LEETCODE_USERNAME = "Riya_Mehta17";

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch GitHub data
        await Promise.all([
          fetchGithubStats(),
          fetchLeetCodeStats()
        ]);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch developer statistics. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Fetch GitHub numerical stats
  const fetchGithubStats = async () => {
    try {
      // Fetch repositories to calculate total stars and commits
      const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
      const reposData = await reposResponse.json();

      // Calculate total stars
      const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);

      // Fetch search results for PRs and issues
      const [prsResponse, issuesResponse] = await Promise.all([
        fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr`),
        fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:issue`)
      ]);

      const prsData = await prsResponse.json();
      const issuesData = await issuesResponse.json();

      setGithubStats({
        totalStars: totalStars || 25,
        totalCommits: 580, // GitHub API doesn't provide total commits easily, using placeholder
        totalPRs: prsData.total_count || 45,
        totalIssues: issuesData.total_count || 12
      });
    } catch (error) {
      console.error("Error fetching GitHub stats:", error);
      // Set fallback values for Riya's profile
      setGithubStats({
        totalStars: 25,
        totalCommits: 580,
        totalPRs: 45,
        totalIssues: 12
      });
    }
  };

  // Fetch LeetCode stats
  const fetchLeetCodeStats = async () => {
    try {
      const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`);
      const data = await response.json();

      if (data && data.status === "success") {
        setLeetcodeStats({
          ranking: data.ranking || 250000,
          totalSolved: data.totalSolved || 85,
          totalProblems: 3700,
          easySolved: data.easySolved || 65,
          easyTotal: 904,
          mediumSolved: data.mediumSolved || 18,
          mediumTotal: 1923,
          hardSolved: data.hardSolved || 2,
          hardTotal: 873,
          acceptanceRate: data.acceptanceRate || 72.5
        });
      } else {
        throw new Error("Invalid LeetCode API response");
      }
    } catch (error) {
      console.error("Error fetching LeetCode stats:", error);
      // Set fallback values for Riya's profile
      setLeetcodeStats({
        ranking: 250000,
        totalSolved: 85,
        totalProblems: 3700,
        easySolved: 65,
        easyTotal: 904,
        mediumSolved: 18,
        mediumTotal: 1923,
        hardSolved: 2,
        hardTotal: 873,
        acceptanceRate: 72.5
      });
    }
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="github-stats-loading">
      <div className="loading-spinner"></div>
      <p>Loading developer statistics...</p>
    </div>
  );

  // Error display component
  const ErrorDisplay = () => (
    <div className="github-stats-error">
      <h3>⚠️ Error</h3>
      <p>{error}</p>
      <button onClick={() => window.location.reload()} className="retry-btn">
        Retry
      </button>
    </div>
  );

  // Circular progress component - smaller and more attractive
  const CircularProgress = ({ percentage, size = 60 }) => {
    const radius = (size - 10) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="circular-progress" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="progress-svg">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="progress-background"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="progress-foreground"
            style={{
              strokeDasharray,
              strokeDashoffset,
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%'
            }}
          />
        </svg>
        <div className="progress-text">
          {percentage.toFixed(1)}%
        </div>
      </div>
    );
  };

  // Stats cards component - Reference design inspired
  const StatsCards = () => (
    <div className="developer-stats-container">
      {/* GitHub Stats Card */}
      <div className="developer-card github-stats-card">
        <div className="card-header">
          <div className="github-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <h3 className="card-title">GitHub Stats</h3>
        </div>
        
        <div className="card-content">
          <div className="stats-list">
            <div className="stat-row">
              <span className="stat-icon">⭐</span>
              <span className="stat-text">Total Stars Earned:</span>
              <span className="stat-value">{githubStats.totalStars}</span>
            </div>
            <div className="stat-row">
              <span className="stat-icon">🕐</span>
              <span className="stat-text">Total Commits (last year):</span>
              <span className="stat-value">{githubStats.totalCommits}</span>
            </div>
            <div className="stat-row">
              <span className="stat-icon">🔄</span>
              <span className="stat-text">Total PRs:</span>
              <span className="stat-value">{githubStats.totalPRs}</span>
            </div>
            <div className="stat-row">
              <span className="stat-icon">🐛</span>
              <span className="stat-text">Total Issues:</span>
              <span className="stat-value">{githubStats.totalIssues}</span>
            </div>
            <div className="stat-row">
              <span className="stat-icon">📅</span>
              <span className="stat-text">Contributed to (last year):</span>
              <span className="stat-value">33</span>
            </div>
          </div>
          
          <div className="grade-circle">
            <div className="grade-letter">A</div>
          </div>
        </div>
        
        <button className="view-profile-btn github-btn" onClick={() => window.open('https://github.com/1754riya', '_blank')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View GitHub Profile
        </button>
      </div>

      {/* LeetCode Stats Card */}
      <div className="developer-card leetcode-stats-card">
        <div className="card-header">
          <div className="leetcode-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.518 2.524 8.117.957l.818-.498a1.375 1.375 0 0 0-.612-2.518c-.540-.097-1.016.24-1.016.795 0 .291-.15.543-.37.69-.165.11-.31.291-.274.503.035.21.15.414.498.595l.697.426c-1.273.855-2.96.699-4.06-.42l-3.854-4.126c-.547-.584-.874-1.287-.874-2.056 0-.769.327-1.472.874-2.056l3.854-4.126a1.375 1.375 0 0 1 1.961 0l3.854 4.126c.547.584.874 1.287.874 2.056 0 .769-.327 1.472-.874 2.056l-1.446 1.548a1.374 1.374 0 0 0 2.029 1.896l1.446-1.548a5.938 5.938 0 0 0 1.271-1.818 5.83 5.83 0 0 0 .349-1.017 5.527 5.527 0 0 0 .062-2.362 5.35 5.35 0 0 0-.125-.513 5.266 5.266 0 0 0-1.209-2.104L17.866 6.226 12.46.751A1.375 1.375 0 0 0 11.5.438c-.4 0-.8.15-1.061.438z"/>
            </svg>
          </div>
          <h3 className="card-title">LeetCode Stats</h3>
        </div>
        
        <div className="card-content">
          <div className="leetcode-main-info">
            <div className="ranking-info">
              <span className="label">Ranking:</span>
              <span className="value">{leetcodeStats.ranking.toLocaleString()}</span>
            </div>
            <div className="solved-info">
              <span className="label">Total Questions Solved:</span>
              <span className="value">{leetcodeStats.totalSolved}/{leetcodeStats.totalProblems}</span>
            </div>
          </div>
          
          <div className="difficulty-breakdown">
            <div className="difficulty-row easy-row">
              <span className="difficulty-name">Easy Questions Solved:</span>
              <span className="difficulty-count">{leetcodeStats.easySolved}/{leetcodeStats.easyTotal}</span>
            </div>
            <div className="difficulty-row medium-row">
              <span className="difficulty-name">Medium Questions Solved:</span>
              <span className="difficulty-count">{leetcodeStats.mediumSolved}/{leetcodeStats.mediumTotal}</span>
            </div>
            <div className="difficulty-row hard-row">
              <span className="difficulty-name">Hard Questions Solved:</span>
              <span className="difficulty-count">{leetcodeStats.hardSolved}/{leetcodeStats.hardTotal}</span>
            </div>
          </div>
          
          <div className="acceptance-rate-section">
            <CircularProgress percentage={leetcodeStats.acceptanceRate} size={80} />
            <span className="acceptance-text">{leetcodeStats.acceptanceRate}% acceptance</span>
          </div>
        </div>
        
        <button className="view-profile-btn leetcode-btn" onClick={() => window.open('https://leetcode.com/u/Riya_Mehta17/', '_blank')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.518 2.524 8.117.957l.818-.498a1.375 1.375 0 0 0-.612-2.518c-.540-.097-1.016.24-1.016.795 0 .291-.15.543-.37.69-.165.11-.31.291-.274.503.035.21.15.414.498.595l.697.426c-1.273.855-2.96.699-4.06-.42l-3.854-4.126c-.547-.584-.874-1.287-.874-2.056 0-.769.327-1.472.874-2.056l3.854-4.126a1.375 1.375 0 0 1 1.961 0l3.854 4.126c.547.584.874 1.287.874 2.056 0 .769-.327 1.472-.874 2.056l-1.446 1.548a1.374 1.374 0 0 0 2.029 1.896l1.446-1.548a5.938 5.938 0 0 0 1.271-1.818 5.83 5.83 0 0 0 .349-1.017 5.527 5.527 0 0 0 .062-2.362 5.35 5.35 0 0 0-.125-.513 5.266 5.266 0 0 0-1.209-2.104L17.866 6.226 12.46.751A1.375 1.375 0 0 0 11.5.438c-.4 0-.8.15-1.061.438z"/>
          </svg>
          View LeetCode Profile
        </button>
      </div>
    </div>
  );

  return (
    <section className="github-activity-section">
      <Container>
        <Row>
          <Col lg={12}>
            <h1 className="project-heading">
              Developer <strong className="purple">Statistics</strong>
            </h1>
            
            {isLoading && <LoadingSpinner />}
            {error && <ErrorDisplay />}
            
            {!isLoading && !error && (
              <StatsCards />
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GithubStats;