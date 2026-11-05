# The Base Public School

The Base Public School (Kusmhi Bazar, Gorakhpur) is an educational institution presenting admissions, academics, faculty, campus, notices and contact information to students and parents.

## Live Demo

Not deployed publicly. Run locally with:

```bash
python3 -m http.server <port> --directory .
```

See [Installation and Setup](#installation-and-setup).

## Screenshots

Real captured screenshots of the running site (desktop 1440x900, mobile 390x844). Relative paths — file names include the project slug so every repository is unique:

| Desktop | Mobile |
|---|---|
| `screenshots/desktop/the-bps-index-1440x900.png` | `screenshots/mobile/the-bps-index-390x844.png` |

## About the Project

The Base Public School (Kusmhi Bazar, Gorakhpur) is an educational institution presenting admissions, academics, faculty, campus, notices and contact information to students and parents.

## Key Features

 - Homepage with admissions call-to-action
 - About Us, Academics, Admissions, Faculty, Gallery, Notices pages
 - Contact form (contact.html)
 - Notices and important announcements page
 - Campus and faculty imagery


## Technology Stack

HTML, CSS, JavaScript; Font Awesome 6 (CDN); static site

## Project Structure

 - `.`
 - `assets/documents`
 - `assets/faculty`
 - `assets/gallery`
 - `assets/infrastructure`
 - `assets/logo`
 - `assets/toppers`
 - `css`
 - `data`
 - `js`
 - `screenshots/desktop`
 - `screenshots/mobile`


## Installation and Setup

python3 -m http.server 8106

```bash
cd the-bps
python3 -m http.server <port>
# open http://localhost:<port>
```

## Environment Configuration

No environment variables are required for this static site. There are no `.env` files or secrets in the project.

## My Contribution

The original website was authored by its owner (as identified in the source), not by me. I prepared this repository for professional GitHub publication: I verified the source files, captured real screenshots, and generated the documentation. I did not rewrite the site's functionality or design.

## Responsive Design

Pages verified at 1440x900 (desktop) and 390x844 (mobile).

## Security and Privacy

Security audit performed during preparation. No API keys, tokens, private keys, database credentials, or SMTP credentials were found. Personal contact information present in the site (phone numbers, emails) is displayed on the live site and should not be republished beyond the repository.

## Known Limitations

- The site is a static site and is not deployed online; it must be served locally.
- Some pages reference local assets and third-party fonts/CDN resources.

## Future Improvements

- Deploy the site to a public host and add a real Live Demo link.
- Add a managed content backend (CMS) if content changes frequently.
- Optimise large images for faster page load.

## License

No license is present in the source code. The source code is therefore **not licensed for reuse**. Contact the project owner before reuse.
