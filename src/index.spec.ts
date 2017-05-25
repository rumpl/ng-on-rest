import { TestBed } from '@angular/core/testing';
import { NG_ON_REST_ENDPOINT, NgOnRestModule } from './';

describe('NgOnRestModule', () => {
  it('Should be configured with endpoint', () => {
    expect(TestBed.configureTestingModule({
      imports: [NgOnRestModule.forRoot({ endpoint: 'path/to/api' })],
    }).get(NG_ON_REST_ENDPOINT)).toBe('path/to/api');
  });
});
