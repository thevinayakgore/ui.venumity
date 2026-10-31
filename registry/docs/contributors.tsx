import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PRIMITIVES } from "@/registry/primitives";
import { COMPONENTS } from "@/registry/components";
import {
  Building2,
  Newspaper,
  Scale,
  HeartHandshake,
  ShieldCheck,
  LinkIcon,
  LucideIcon,
  SquareArrowOutUpRight,
} from "lucide-react";

// Type for the data we get from GitHub API
type GitHubUser = {
  login?: string;
  name?: string | null;
  avatar_url?: string;
  bio?: string | null;
  followers?: number;
  following?: number;
  public_repos?: number;
  company?: string | null;
  blog?: string | null;
  twitter_username?: string | null;
  html_url?: string;
};

type SocialAccount = {
  provider: string;
  url: string;
};

// New type for user's repository data to calculate achievements
type GitHubRepo = {
  stargazers_count: number;
  forks_count: number;
};

// New type for combined user data including achievements
type UserWithAchievements = GitHubUser & {
  socialAccounts?: SocialAccount[];
  achievements: {
    totalStars: number;
    totalForks: number;
    hasSponsors: boolean;
  };
};

// Extract unique GitHub usernames from both registries
function getUniqueContributors(): string[] {
  // ✅ Initialize with the core contributor so they are always first
  const usernames = new Set<string>(["thevinayakgore"]);

  const collectFromRegistry = (
    registry: typeof COMPONENTS | typeof PRIMITIVES,
  ) => {
    for (const category of registry) {
      for (const subcategory of category.subcategories) {
        for (const item of subcategory.items) {
          if (item.githubUsername) {
            usernames.add(item.githubUsername);
          }
        }
      }
    }
  };

  collectFromRegistry(COMPONENTS);
  collectFromRegistry(PRIMITIVES);

  return Array.from(usernames);
}

// Fetch GitHub profile for a single username
async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  if (!res.ok) {
    console.error(`Failed to fetch ${username}: ${res.status}`);
    return null;
  }
  return res.json();
}

// Fetch social accounts for a user
async function fetchSocialAccounts(username: string): Promise<SocialAccount[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/social_accounts`,
    {
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) {
    console.error(
      `Failed to fetch social accounts for ${username}: ${res.status}`,
    );
    return [];
  }
  return res.json();
}

// Fetch user's repositories to calculate total stars and forks
async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    {
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) {
    console.error(`Failed to fetch repos for ${username}: ${res.status}`);
    return [];
  }
  return res.json();
}

// Calculate achievements from repositories
function calculateAchievements(repos: GitHubRepo[]): {
  totalStars: number;
  totalForks: number;
  hasSponsors: boolean;
} {
  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0,
  );
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const hasSponsors = false;
  return { totalStars, totalForks, hasSponsors };
}

// Get provider icon component
function getSocialIcon(provider: string) {
  switch (provider.toLowerCase()) {
    case "twitter":
    case "x":
      return (
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4l11.733 16h4.267l-11.733 -16h-4.267" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      );

    case "youtube":
      return (
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8" />
          <path d="M10 9l5 3l-5 3z" />
        </svg>
      );

    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className="size-5 fill-current">
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.67-1.27 2.3-2.6 4.74-2.6C22.2 7.6 24 10.1 24 14.2V24h-5v-8.4c0-2-.03-4.5-2.74-4.5-2.74 0-3.16 2.14-3.16 4.36V24h-5V8z" />
        </svg>
      );

    case "instagram":
      return (
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="18" cy="6" r="1" fill="currentColor" />
        </svg>
      );

    default:
      return <SquareArrowOutUpRight className="size-4" />;
  }
}

function getSocialLabel(provider: string) {
  const socialProviders = ["twitter", "x", "youtube", "linkedin", "instagram"];

  return socialProviders.includes(provider.toLowerCase()) ? provider : "Link";
}

type GitLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const gitLinks: GitLink[] = [
  {
    label: "Readme",
    href: "https://github.com/thevinayakgore/ui.venumity/blob/main/README.md",
    icon: Newspaper,
  },
  {
    label: "License",
    href: "https://github.com/thevinayakgore/ui.venumity/blob/main/LICENSE",
    icon: Scale,
  },
  {
    label: "Code of Conduct",
    href: "https://github.com/thevinayakgore/ui.venumity/blob/main/CODE_OF_CONDUCT.md",
    icon: HeartHandshake,
  },
  {
    label: "Security",
    href: "https://github.com/thevinayakgore/ui.venumity/blob/main/SECURITY.md",
    icon: ShieldCheck,
  },
];

const gitButtonClassName =
  "font-medium bg-background dark:bg-foreground/10 hover:bg-foreground! text-foreground/60 hover:text-secondary! border-foreground/20! shadow-none";

export default async function Contributors() {
  const usernames = getUniqueContributors();
  const users: UserWithAchievements[] = [];

  // Fetch all data in parallel
  const userResults = await Promise.all(usernames.map(fetchGitHubUser));
  const socialResults = await Promise.all(usernames.map(fetchSocialAccounts));
  const reposResults = await Promise.all(usernames.map(fetchUserRepos));

  for (let i = 0; i < usernames.length; i++) {
    const user = userResults[i];
    if (user?.login) {
      const achievements = calculateAchievements(reposResults[i] || []);
      users.push({
        ...user,
        socialAccounts: socialResults[i] || [],
        achievements,
      });
    }
  }

  return (
    <section className="font-serif space-y-5 w-full h-full">
      {/* Header */}
      <header className="flex flex-col gap-5 pb-5 border-b w-full">
        <div className="flex flex-col items-start w-full">
          <h3 className="text-3xl font-medium">Contributors</h3>
          <p className="text-sm md:text-base text-muted-foreground">
            Meet the amazing people who built things and contributed to{" "}
            <span className="text-foreground">ui.venumity.com</span> project.
          </p>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 w-full">
          {gitLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className={gitButtonClassName}>
                <Icon />
                {label}
              </Button>
            </Link>
          ))}
        </div>
      </header>

      {/* Content */}
      {users.length === 0 ? (
        <div className="text-center p-3 md:p-5 lg:p-10 text-foreground/40">
          No contributors found.
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 gap-3 w-full">
          {users.map((user) => (
            <div
              id={user.login}
              key={user.login}
              className="group flex flex-col gap-2 p-2 md:p-3 mb-3 break-inside-avoid bg-card border rounded-2xl sm:rounded-3xl w-full"
            >
              <header className="grid grid-cols-1 sm:grid-cols-3 items-start gap-2 w-full h-fit">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={user.html_url ?? "#"}
                  className="col-span-1 border rounded-xl md:rounded-2xl overflow-hidden w-full h-full"
                >
                  <Image
                    src={user.avatar_url ?? "/logo.png"}
                    alt={user.name || user.login || "Contributor"}
                    width={2000}
                    height={2000}
                    priority
                    unoptimized
                    className="object-cover group-hover:scale-115 transition-all duration-500 w-full h-full"
                  />
                </Link>
                <div className="col-span-2 relative flex flex-col items-start justify-between gap-1 p-3.5 bg-background border rounded-xl sm:rounded-2xl overflow-hidden w-full h-full">
                  <div className="w-full min-w-0">
                    <span className="block text-sm font-semibold w-full min-w-0 truncate tracking-wide">
                      {user.name || user.login}
                    </span>
                    <h2 className="block text-sm text-foreground/50 leading-none w-full min-w-0 truncate pb-0.5">
                      @{user.login}
                    </h2>
                  </div>
                  {(user.company || user.blog) && (
                    <div className="space-y-0.5 text-sm font-semibold">
                      {user.company && (
                        <div className="flex items-center gap-1.5">
                          <Building2 className="size-3.5" />
                          <span>{user.company.split(" ")[0]}</span>
                        </div>
                      )}
                      {user.blog && (
                        <div className="flex items-center gap-1.5 text-sky-500 truncate">
                          <LinkIcon className="size-3.5" />
                          <Link
                            href={
                              user.blog.startsWith("http")
                                ? user.blog
                                : `https://${user.blog}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline underline-offset-2"
                          >
                            {user.blog
                              .replace(/^https?:\/\//, "")
                              .replace(/\/+$/, "")}
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="absolute -top-9 -right-15 -rotate-20">
                    <svg
                      viewBox="0 0 438.549 438.549"
                      className="size-40! text-sky-500/10 group-hover:scale-120 transition-all duration-[1.5s] rounded-full"
                    >
                      <path
                        fill="currentColor"
                        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                      ></path>
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-60 bg-linear-to-l from-transparent via-sky-500 to-transparent rounded-full h-px w-2/3" />
                  <div className="absolute -bottom-5 left-0 bg-linear-to-l from-transparent via-sky-500 to-transparent opacity-50 blur-xl rounded-full h-10 w-full" />
                </div>
              </header>

              <div className="flex flex-col bg-background border shadow-lg/10 rounded-xl sm:rounded-2xl w-full">
                {user.bio && (
                  <p className="p-5 text-xs sm:text-sm tracking-wide text-muted-foreground">
                    {user.bio}
                  </p>
                )}

                {/* Social Links */}
                {user.socialAccounts && user.socialAccounts.length > 0 && (
                  <div className="flex items-center justify-between gap-3 p-5 border-y border-dashed border-foreground/15 w-full">
                    {user.socialAccounts.map((social) => (
                      <Link
                        key={social.provider}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-start gap-2 text-sm tracking-wide text-foreground/50 hover:text-foreground transition-all duration-500"
                      >
                        {getSocialIcon(social.provider)}
                        <span className="capitalize">
                          {getSocialLabel(social.provider)}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {/* GitHub Stats */}
                <div className="grid grid-cols-3 gap-2 p-5 text-start text-sm tracking-wide w-full">
                  <div>
                    <div className="text-2xl opacity-30 font-bold">
                      {String(user.followers ?? 0).padStart(2, "0")}
                    </div>
                    <div className="text-foreground/50">Followers</div>
                  </div>
                  <div>
                    <div className="text-2xl opacity-30 font-bold">
                      {String(user.following ?? 0).padStart(2, "0")}
                    </div>
                    <div className="text-foreground/50">Following</div>
                  </div>
                  <div>
                    <div className="text-2xl opacity-30 font-bold">
                      {String(user.public_repos ?? 0).padStart(2, "0")}
                    </div>
                    <div className="text-foreground/50">Public Repos</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
