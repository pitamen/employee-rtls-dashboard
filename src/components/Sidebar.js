import React from 'react'

const Sidebar = () => {
  return (
    <div><div class="wrapper">
    <nav id="sidebar">
        <div class="text-center">
            <h2>Logo</h2>
        </div>
        <ul class="list-unstyled">
            <li>
                <a href="#">Home</a>
            </li>
            <li>
                <a href="#">About</a>
            </li>
            <li>
                <a href="#">Services</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
        </ul>
    </nav>
    <div id="content">
        <h2>Main Content</h2>
        <p>This is the main content area.</p>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-hn8w5tHgDP6knvdiN9zB6t9LgGtjiVmpeFf/nq0Jz5hIehaP5QKa/KR6mK5fqtS9" crossorigin="anonymous"></script></div>
  )
}

export default Sidebar