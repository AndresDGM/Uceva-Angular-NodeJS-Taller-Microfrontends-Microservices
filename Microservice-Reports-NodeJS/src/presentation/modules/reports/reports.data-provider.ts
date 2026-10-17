import { envs } from '../../../config/envs';
import { CustomError } from '../../../domain/errors/custom.error';
import {
  ReportFilters,
  ReportRow,
  ReportType,
} from '../../../domain/interfaces/report.interface';

interface RemoteUser {
  id: number;
  name: string;
  lastName: string;
  age: number;
  email: string;
  engineering: string;
}

interface RemoteProduct {
  id: number;
  name: string;
  category: string;
  price: number;
}

export interface ReportsDataProvider {
  getData(type: ReportType, filters: ReportFilters): Promise<ReportRow[]>;
}

export class HttpReportsDataProvider implements ReportsDataProvider {
  async getData(type: ReportType, filters: ReportFilters): Promise<ReportRow[]> {
    const count = this.getCount(filters);

    if (type === 'USERS_SUMMARY') {
      return this.getUsers(count);
    }

    if (type === 'ACTIVITY') {
      return this.getProducts(count);
    }

    const [users, products] = await Promise.all([
      this.getUsers(count),
      this.getProducts(count),
    ]);

    return [...users, ...products];
  }

  private getCount(filters: ReportFilters): number {
    const requestedCount = typeof filters.count === 'number' ? filters.count : 10;
    return Math.min(100, Math.max(1, Math.trunc(requestedCount)));
  }

  private async getUsers(count: number): Promise<ReportRow[]> {
    const users = await this.getJson<RemoteUser[]>(
      `${envs.USERS_SERVICE_URL}/api/users/${count}`,
    );

    return users.map((user) => ({
      id: user.id,
      name: `${user.name} ${user.lastName}`,
      age: user.age,
      email: user.email,
      category: user.engineering,
    }));
  }

  private async getProducts(count: number): Promise<ReportRow[]> {
    const products = await this.getJson<RemoteProduct[]>(
      `${envs.PRODUCTS_SERVICE_URL}/api/products/${count}`,
    );

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
    }));
  }

  private async getJson<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw CustomError.internalServer(
        `No fue posible obtener datos desde ${url} (${response.status}).`,
      );
    }

    return (await response.json()) as T;
  }
}
