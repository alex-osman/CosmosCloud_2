/* tslint:disable:no-unused-variable */
//TODO: delete function()

import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { RequestMethod, HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { FileService } from './file.service';
import { File } from './file';

const mockFile = {
  'name': 'testing123',
  'filetype': 'txt',
  'path': '/assets/text',
  'extension': '.txt',
  'size': 2000
};

describe('FileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        FileService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  it('should create a service', inject([ FileService ], (fileService) => {
    expect(fileService).toBeTruthy();
  }));

  it('should get File Object back', fakeAsync(
    inject([ XHRBackend, FileService ], (mockBackend, fileService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);

        connection.mockRespond(new Response(
          new ResponseOptions({ body: mockFile })
        ));
      });

      fileService.getFiles().then((res) => {
        expect(res).toEqual(mockFile);
      });
    })
  ));


});
