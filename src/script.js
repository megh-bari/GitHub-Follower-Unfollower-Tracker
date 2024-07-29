document.getElementById('search-btn').addEventListener('click', async function() {
    const username = document.getElementById('username').value;
    const followersList = document.getElementById('followers-list');
    const unfollowersList = document.getElementById('unfollowers-list');
    const followersSection = document.getElementById('followers-section');
    const unfollowersSection = document.getElementById('unfollowers-section');
    const showFollowersBtn = document.getElementById('show-followers-btn');
    const showUnfollowersBtn = document.getElementById('show-unfollowers-btn');

    followersList.innerHTML = ''; 
    unfollowersList.innerHTML = '';

    if (!username) {
        alert('Please enter a GitHub username');
        return;
    }

    try {
        // Fetch followers
        const followersResponse = await fetch(`https://api.github.com/users/${username}/followers`);
        if (!followersResponse.ok) {
            throw new Error('GitHub user not found');
        }
        const followers = await followersResponse.json();
        const followerLogins = followers.map(follower => follower.login);

        // Fetch following
        const followingResponse = await fetch(`https://api.github.com/users/${username}/following`);
        if (!followingResponse.ok) {
            throw new Error('GitHub user not found');
        }
        const following = await followingResponse.json();
        const followingLogins = following.map(following => following.login);

        // Display followers
        followers.forEach(follower => {
            const listItem = document.createElement('li');
            const followerLink = document.createElement('a');
            followerLink.textContent = follower.login;
            followerLink.href = follower.html_url;
            followerLink.target = '_blank';
            followerLink.classList.add('github-link');
            listItem.appendChild(followerLink);
            followersList.appendChild(listItem);
        });

        // * Display unfollowers (users you follow who don't follow you back)
        following.forEach(followingUser => {
            if (!followerLogins.includes(followingUser.login)) {
                const listItem = document.createElement('li');
                const unfollowerLink = document.createElement('a');
                unfollowerLink.textContent = followingUser.login;
                unfollowerLink.href = followingUser.html_url;
                unfollowerLink.target = '_blank';
                unfollowerLink.classList.add('github-link');
                listItem.appendChild(unfollowerLink);
                unfollowersList.appendChild(listItem);
            }
        });

        // * Show the followers section by default
        followersSection.classList.add('active');
        unfollowersSection.classList.remove('active');
        showFollowersBtn.classList.add('active');
        showUnfollowersBtn.classList.remove('active');

    } catch (error) {
        alert('Error fetching data: ' + error.message);
    }
});

document.getElementById('show-followers-btn').addEventListener('click', function() {
    document.getElementById('followers-section').classList.add('active');
    document.getElementById('unfollowers-section').classList.remove('active');
    this.classList.add('active');
    document.getElementById('show-unfollowers-btn').classList.remove('active');
});

document.getElementById('show-unfollowers-btn').addEventListener('click', function() {
    document.getElementById('unfollowers-section').classList.add('active');
    document.getElementById('followers-section').classList.remove('active');
    this.classList.add('active');
    document.getElementById('show-followers-btn').classList.remove('active');
});


