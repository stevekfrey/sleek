import axios from 'axios';
import { LinearIssue, LinearTeam } from '../types';

// Use local proxy server to avoid CORS issues
const LINEAR_API_URL = 'http://localhost:4002/api/linear';

export class LinearAPI {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async query(query: string, variables?: any) {
    try {
      const response = await axios.post(
        LINEAR_API_URL,
        { query, variables },
        {
          headers: {
            'Authorization': this.apiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      return response.data.data;
    } catch (error) {
      console.error('Linear API Error:', error);
      throw error;
    }
  }

  async getTeams(): Promise<LinearTeam[]> {
    const query = `
      query GetTeams {
        teams {
          nodes {
            id
            name
            key
            description
            icon
          }
        }
      }
    `;

    const data = await this.query(query);
    return data.teams.nodes;
  }

  async getIssues(teamId?: string): Promise<LinearIssue[]> {
    const query = `
      query GetIssues($teamId: ID) {
        issues(filter: { team: { id: { eq: $teamId } } }, first: 100) {
          nodes {
            id
            title
            description
            state {
              id
              name
              type
            }
            priority
            assignee {
              id
              name
              email
            }
            createdAt
            updatedAt
            dueDate
            labels {
              nodes {
                id
                name
                color
              }
            }
            team {
              id
              name
            }
          }
        }
      }
    `;

    const data = await this.query(query, { teamId });
    return data.issues.nodes;
  }

  async getIssuesByAssignee(assigneeId: string): Promise<LinearIssue[]> {
    const query = `
      query GetIssuesByAssignee($assigneeId: ID) {
        issues(filter: { assignee: { id: { eq: $assigneeId } } }, first: 100) {
          nodes {
            id
            title
            description
            state {
              id
              name
              type
            }
            priority
            assignee {
              id
              name
              email
            }
            createdAt
            updatedAt
            dueDate
            labels {
              nodes {
                id
                name
                color
              }
            }
            team {
              id
              name
            }
          }
        }
      }
    `;

    const data = await this.query(query, { assigneeId });
    return data.issues.nodes;
  }

  async getIssue(id: string): Promise<LinearIssue> {
    const query = `
      query GetIssue($id: ID!) {
        issue(id: $id) {
          id
          title
          description
          state {
            id
            name
            type
          }
          priority
          assignee {
            id
            name
            email
          }
          createdAt
          updatedAt
          dueDate
          labels {
            nodes {
              id
              name
              color
            }
          }
          team {
            id
            name
          }
        }
      }
    `;

    const data = await this.query(query, { id });
    return data.issue;
  }
}

// Utility function to convert Linear priority to our priority format
export const convertLinearPriority = (priority: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' => {
  switch (priority) {
    case 0:
      return 'LOW';
    case 1:
      return 'MEDIUM';
    case 2:
      return 'HIGH';
    case 3:
      return 'URGENT';
    default:
      return 'MEDIUM';
  }
};

// Utility function to convert Linear state to our status format
export const convertLinearState = (state: string): 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED' => {
  const stateLower = state.toLowerCase();
  if (stateLower.includes('done') || stateLower.includes('completed')) {
    return 'DONE';
  }
  if (stateLower.includes('progress') || stateLower.includes('in progress')) {
    return 'IN_PROGRESS';
  }
  if (stateLower.includes('cancelled') || stateLower.includes('canceled')) {
    return 'CANCELLED';
  }
  return 'TODO';
}; 