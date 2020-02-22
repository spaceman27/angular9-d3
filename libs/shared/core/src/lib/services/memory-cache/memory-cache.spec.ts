import { MemoryCache } from './memory-cache';

describe('MemoryCache', () => {
  describe('set', () => {
    it('should set an entry', () => {
      const cache = new MemoryCache();
      expect(cache.set('test', true)).toBeUndefined();
    });
  });

  describe('has', () => {
    it('should return `false` for non-existant entries', () => {
      const cache = new MemoryCache();

      expect(cache.has('test')).toBe(false);
    });

    it('should return true within the cache time', () => {
      const cache = new MemoryCache<string>(60000);
      cache.set('test', 'foo');

      expect(cache.has('test')).toBe(true);
    });

    it('should return the value for an entry with a null cache time', () => {
      const cache = new MemoryCache<string>();
      cache.set('test', 'foo');

      expect(cache.has('test')).toBe(true);
    });

    it('should return undefined for entries outside the cache time', () => {
      const cache = new MemoryCache<string>(-1);
      cache.set('test', 'foo');

      expect(cache.has('test')).toBe(false);
    });
  });

  describe('get', () => {
    it('should return `undefined` for non-existant entries', () => {
      const cache = new MemoryCache();

      expect(cache.get('test')).toBeUndefined();
    });

    it('should return the value for entries within the cache time', () => {
      const cache = new MemoryCache<string>(60000);
      cache.set('test', 'foo');

      expect(cache.get('test')).toBe('foo');
    });

    it('should return the value for entries with a null cache time', () => {
      const cache = new MemoryCache<string>();
      cache.set('test', 'foo');

      expect(cache.get('test')).toBe('foo');
    });

    it('should return `undefined` for entries outside the cache time', () => {
      const cache = new MemoryCache<string>(-1);
      cache.set('test', 'foo');

      expect(cache.get('test')).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should not have an entry for non-existant entries', () => {
      const cache = new MemoryCache();
      cache.delete('test');

      expect(cache.has('test')).toBe(false);
    });

    it('should not have an entry for entries within the cache time', () => {
      const cache = new MemoryCache<string>(60000);
      cache.set('test', 'foo');
      cache.delete('test');

      expect(cache.has('test')).toBe(false);
    });

    it('should not have an entry for entries with a null cache time', () => {
      const cache = new MemoryCache<string>();
      cache.set('test', 'foo');
      cache.delete('test');

      expect(cache.has('test')).toBe(false);
    });

    it('should not have an entry for entries outside the cache time', () => {
      const cache = new MemoryCache<string>(-1);
      cache.set('test', 'foo');
      cache.delete('test');

      expect(cache.has('test')).toBe(false);
    });
  });
});
